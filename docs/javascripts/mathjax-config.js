// Carve's math-block extension emits `<span class="math inline">\\( … \\)</span>`
// and `<span class="math display">\\[ … \\]</span>` - its own class, not
// arithmatex's - so MathJax is pointed at THAT class.
//
// The re-typeset after Zensical's instant navigation has to disconnect the
// observer first. Typesetting mutates the DOM, a naive observer sees its own
// output, and the page ends up in a typeset loop that crashes the tab. Asked
// how I know.
window.MathJax = {
  tex: {
    inlineMath: [["\\(", "\\)"]],
    displayMath: [["\\[", "\\]"]],
    processEscapes: true,
  },
  options: {
    ignoreHtmlClass: "no-mathjax",
    processHtmlClass: "math|arithmatex",
  },
  startup: {
    ready() {
      MathJax.startup.defaultReady()

      let scheduled = false
      const observer = new MutationObserver(() => {
        if (scheduled) return
        scheduled = true
        observer.disconnect()
        Promise.resolve()
          .then(() => MathJax.typesetPromise())
          .catch(() => {})
          .then(() => {
            scheduled = false
            observe()
          })
      })
      const observe = () =>
        observer.observe(document.body, { childList: true, subtree: true })

      MathJax.typesetPromise().catch(() => {}).then(observe)
    },
  },
}
