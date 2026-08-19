# zensical-carve-demo

A [Zensical][zensical] documentation site whose pages are written in
[Carve][carve] instead of Markdown, built by [zensical-carve][plugin] with
**every Carve extension enabled**.

**→ [markup-carve.github.io/zensical-carve-demo](https://markup-carve.github.io/zensical-carve-demo/)**

Zensical is the successor to MkDocs and Material for MkDocs, from the same team.

## What is in it

| Page | Source | Shows |
| --- | --- | --- |
| The inline set | [`docs/index.crv`](docs/index.crv) | the inline marks against their Markdown spellings, automatic typography, semantic spans, a spoiler, a color swatch |
| Blocks | [`docs/blocks.crv`](docs/blocks.crv) | admonitions, a collapsible section, tabs, a table with header cells and a caption, a list table, a code group, code callouts, math, a line block |
| Diagrams | [`docs/diagrams.crv`](docs/diagrams.crv) | Mermaid, Chart.js, Vega-Lite, D2 and Graphviz drawing live; WaveDrom and ABC as source |
| Markdown, for contrast | [`docs/markdown.md`](docs/markdown.md) | the same constructs in Markdown plus the 22 extensions `zensical new` enables |
| Reference features | [`docs/reference.crv`](docs/reference.crv) | citations with typed locators, a glossary, an index entry, numbered headings, a captioned figure |

## Build it yourself

```bash
pip install zensical zensical-carve
./build.sh          # renders every .crv, then builds
zensical serve      # or preview at localhost:8000
```

`build.sh` reads the extension list from the engine rather than hard-coding it,
so a Carve release that adds an extension turns it on here on the next build.

The `.crv` files are the sources. `zensical-carve prepare` writes a `.md` beside
each one, and those are gitignored - regenerate rather than edit them.

## Things worth knowing, all measured

- **The table of contents, permalinks, syntax highlighting and copy button are
  the theme's own.** The plugin hands headings and code blocks back to Zensical
  as Markdown; everything else stays as Carve's HTML. A page rendered as HTML all
  the way down builds fine and then has an empty table of contents.
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

## License

MIT

[carve]: https://markup-carve.github.io/carve/
[zensical]: https://zensical.org/
[plugin]: https://github.com/markup-carve/zensical-carve
[d2]: https://github.com/zensical/backlog/issues/29
