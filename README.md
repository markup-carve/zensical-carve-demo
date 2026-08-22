# zensical-carve-demo

A [Zensical][zensical] documentation site whose pages are written in
[Carve][carve] instead of Markdown, built by [zensical-carve][plugin] with
**every Carve extension enabled**.

**→ [markup-carve.github.io/zensical-carve-demo](https://markup-carve.github.io/zensical-carve-demo/)**

Zensical is the successor to MkDocs and Material for MkDocs, from the same team.

## What is in it

| Page | Source | Shows |
| --- | --- | --- |
| The inline set | [`docs/index.crv`](docs/index.crv) | the inline marks against their Markdown spellings, symbols as twemoji, automatic typography, semantic spans, a spoiler, a color swatch |
| Blocks | [`docs/blocks.crv`](docs/blocks.crv) | admonitions, a collapsible section, tabs, a table with header cells and a caption, a list table, a code group, code callouts, math, a line block |
| Diagrams | [`docs/diagrams.crv`](docs/diagrams.crv) | Graphviz drawn at build time; Mermaid, Chart.js, Vega-Lite and D2 drawing in the browser; WaveDrom and ABC as source |
| Markdown, for contrast | [`docs/markdown.md`](docs/markdown.md) | the same constructs in Markdown plus the 22 extensions `zensical new` enables |
| Reference features | [`docs/reference.crv`](docs/reference.crv) | citations with typed locators, a glossary, an index entry, numbered headings, a captioned figure |

## Build it yourself

```bash
pip install zensical
pip install "git+https://github.com/markup-carve/zensical-carve@main"
sudo apt-get install graphviz   # `dot` draws one diagram at build time
./build.sh                      # renders every .crv, then builds
zensical serve                  # or preview at localhost:8000
```

zensical-carve is not on PyPI yet, so it installs from the repository - the
deploy workflow does the same. Swap both for `pip install zensical-carve` once
it is released.

`build.sh` reads the extension list from the engine rather than hard-coding it,
so a Carve release that adds an extension turns it on here on the next build.
Everything that is not the list is configured in `zensical.toml`, in a
`[tool.zensical-carve]` table Zensical itself ignores:

```toml
[tool.zensical-carve]
emoji = "twemoji"
prerender = ["graphviz"]

[tool.zensical-carve.prerender-command]
graphviz = "dot -Tsvg {input}"
```

A flag beats the table, which is what lets the extension list stay dynamic in
`build.sh` while these settings stay written down.

The `.crv` files are the sources. `zensical-carve prepare` writes a `.md` beside
each one, and those are gitignored - regenerate rather than edit them.

## Things worth knowing, all measured

- **The table of contents, permalinks, syntax highlighting and copy button are
  the theme's own.** The plugin hands headings and code blocks back to Zensical
  as Markdown; everything else stays as Carve's HTML. A page rendered as HTML all
  the way down builds fine and then has an empty table of contents.
- **One diagram is drawn during the build, the rest in your browser.**
  `prerender = ["graphviz"]` sends the Graphviz source through the local `dot`
  binary and puts the SVG in the page, so nothing is downloaded for it and
  nothing shifts when it appears - the demo dropped `@hpcc-js/wasm` and its
  hydration code with it. Mermaid, Chart.js and Vega-Lite stay client-side on
  purpose, so one page shows both shapes.
- **`:smile:` needs a symbol map, not an extension.** The parsing is core Carve;
  the map from a name to a glyph is a render option, and a document that reaches
  an engine without one renders the shortcode as its own source text. This site
  sets `emoji = "twemoji"`, which reuses Zensical's own emoji index, so a
  shortcode on a Carve page and one on a Markdown page cannot drift apart.
- **Mermaid needed no configuration.** Carve's `fenced-render` preset emits
  `<pre class="mermaid">`, which is the same hook Zensical's own mermaid fence
  emits, so a site that already draws mermaid picks these up unchanged. The
  demo's own hydration script deliberately does *not* handle mermaid - running it
  twice makes the theme throw `UnknownDiagramError`.
- **D2 draws here.** Zensical tracks D2 support as an open change request
  ([zensical/backlog#29][d2]); Carve ships it as one of eight diagram presets.
- **`[[Wikilinks]]` stay literal.** The extension is enabled, but a page name
  only becomes a URL through a generator the host supplies, and this demo
  supplies none.
- **`docs/stylesheets/carve.css`** styles the constructs Material does not know
  about - tabs, spoilers, swatches, callouts, captions, line blocks - scoped
  under `.md-typeset` and using the theme's own color tokens, so both color
  schemes work. It also hides Carve's heading permalinks, because with every
  extension on both Carve and the theme add one.

[carve]: https://markup-carve.github.io/carve/
[zensical]: https://zensical.org/
[plugin]: https://github.com/markup-carve/zensical-carve
[d2]: https://github.com/zensical/backlog/issues/29
