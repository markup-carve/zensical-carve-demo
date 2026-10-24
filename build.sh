#!/usr/bin/env bash
# Build the demo with Carve extensions that preserve literal TSV separators.
#
# The list is read from the engine rather than written down here, so a Carve
# release that adds an extension turns it on here, except tab-normalize, and a
# release that removes one cannot leave a stale name behind that fails the build.
#
# Everything that is NOT the list lives in [tool.zensical-carve] in
# zensical.toml: the emoji map, and drawing Graphviz at build time. A flag beats
# that table, which is exactly why the list can stay dynamic here.
set -euo pipefail

# tab-normalize expands literal TSV separators before Pygments can see them.
EXTENSIONS=$(python3 -c "import carve; print(' '.join(f'--extension {name}' for name in carve.extensions() if name != 'tab-normalize'))")
echo "Enabling $(python3 -c "import carve; print(sum(name != 'tab-normalize' for name in carve.extensions()))") Carve extensions"

# shellcheck disable=SC2086
zensical-carve prepare --force $EXTENSIONS
zensical build
