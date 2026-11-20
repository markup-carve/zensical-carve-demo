#!/usr/bin/env bash
# Build the demo with every Carve 0.2 standard extension that renders a page.
#
# Carve 0.2's carve.extensions() lists only five names (carve-py#140), so the
# list is written down: the carve-rs standard extensions, less
# carve.tabNormalize, which expands literal TSV separators before Pygments can
# see them, and carve.inlineFootnotesToParentheses, which rewrites footnotes.
#
# Everything that is NOT the list lives in [tool.zensical-carve] in
# zensical.toml: the emoji map, and drawing Graphviz at build time.
set -euo pipefail

NAMES=(
  carve.details carve.spoiler carve.spoilerBlock carve.tabs
  carve.codeGroup carve.codeCallouts carve.listTable carve.mathBlock
  carve.fencedRender.mermaid carve.fencedRender.chart carve.fencedRender.vega-lite
  carve.fencedRender.d2 carve.fencedRender.graphviz carve.fencedRender.dot carve.fencedRender.wavedrom
  carve.fencedRender.abc carve.fencedRender.plantuml carve.fencedRender.puml
  carve.semanticSpan carve.smartQuotes carve.colorSwatch carve.wiki
  carve.references carve.glossary carve.index carve.imgFence.img carve.imgFence.image
)
EXTENSIONS=()
for name in "${NAMES[@]}"; do EXTENSIONS+=(--extension "$name"); done
echo "Enabling ${#NAMES[@]} Carve extensions"

zensical-carve prepare --force "${EXTENSIONS[@]}"
zensical build
