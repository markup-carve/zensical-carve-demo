// Hydrate the diagram presets Carve emits.
//
// A FencedRender preset emits ONE hydration element and stops: `<pre class="x">`
// for a text language, `<div class="x"><script type="application/json">` for a
// JSON one. Turning that into a drawing is the client's job, which is what this
// file does for the libraries loaded on this site.
//
// Written for Zensical's instant navigation: the theme swaps page content in
// without a reload, so hydration has to run again on every swap and has to be
// safe to run twice.
//
// Graphviz used to be hydrated here too, from @hpcc-js/wasm. It is drawn at
// build time now - `prerender = ["graphviz"]` in zensical.toml runs the local
// `dot` binary - so the page ships the SVG, no reader downloads a Graphviz
// build, and nothing shifts when it lands. The rest stay client-side, so the
// Diagrams page shows both.

(function () {
  const done = new WeakSet()

  // NO mermaid handler on purpose. Zensical's own bundle already renders
  // `<pre class="mermaid">`, which is the same hook Carve's fenced-render preset
  // emits - so hydrating it here runs mermaid twice. The first pass replaces the
  // element's text with SVG and CSS, and the theme's pass then throws
  // `UnknownDiagramError: No diagram type detected` on what it finds. Leaving it
  // to the theme is both less code and the reason Carve mermaid blocks work in a
  // Zensical site with no configuration at all.

  function payload(el) {
    const script = el.querySelector('script[type="application/json"]')
    if (!script) return null
    try {
      return JSON.parse(script.textContent)
    } catch (error) {
      el.innerHTML = '<p style="color:var(--md-typeset-del-color)">Invalid JSON payload</p>'
      return null
    }
  }

  function hydrateChart() {
    if (typeof Chart === "undefined") return
    document.querySelectorAll("div.chart").forEach((el) => {
      if (done.has(el)) return
      const spec = payload(el)
      if (!spec) return
      done.add(el)
      const canvas = document.createElement("canvas")
      el.appendChild(canvas)
      new Chart(canvas, spec)
    })
  }

  function hydrateVega() {
    if (typeof vegaEmbed === "undefined") return
    document.querySelectorAll("div.vega-lite").forEach((el) => {
      if (done.has(el)) return
      const spec = payload(el)
      if (!spec) return
      done.add(el)
      const target = document.createElement("div")
      el.appendChild(target)
      vegaEmbed(target, spec, { actions: false })
    })
  }

  function hydrate() {
    hydrateChart()
    hydrateVega()
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", hydrate)
  } else {
    hydrate()
  }

  // Instant navigation swaps the article element rather than reloading.
  const observer = new MutationObserver(() => hydrate())
  observer.observe(document.body, { childList: true, subtree: true })
})()
