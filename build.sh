#!/usr/bin/env bash
# Build the demo with every Carve 0.2 standard extension that renders a page.
#
# The list is read from the engine rather than written down here, so an engine
# that adds an extension turns it on here, and one that removes a name cannot
# leave a stale name behind that fails the build. Left out:
# carve.tabNormalize, which expands literal TSV separators before Pygments can
# see them, carve.inlineFootnotesToParentheses, which rewrites footnotes, and
# carve.cite, since carve.references claims :cite itself and the two together
# render every citation empty (markup-carve/carve-rs#4485).
# Added: the dot and puml fence words, which 0.1 graphviz and plantuml claimed.
#
# Everything that is NOT the list lives in [tool.zensical-carve] in
# zensical.toml: the emoji map, and drawing Graphviz at build time. A flag beats
# that table, which is exactly why the list can stay dynamic here.
set -euo pipefail

mapfile -t NAMES < <(python3 -c '
import carve
skip = {"carve.tabNormalize", "carve.inlineFootnotesToParentheses", "carve.cite"}
for name in carve.extensions():
    if name not in skip:
        print(name)
print("carve.fencedRender.dot")
print("carve.fencedRender.puml")
')
EXTENSIONS=()
for name in "${NAMES[@]}"; do EXTENSIONS+=(--extension "$name"); done
echo "Enabling ${#NAMES[@]} Carve extensions"

zensical-carve prepare --force "${EXTENSIONS[@]}"
zensical build
