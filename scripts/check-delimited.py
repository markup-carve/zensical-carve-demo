"""Check the built demo, after Zensical has run its real highlighter."""

from pathlib import Path
import re

html = Path("site/blocks/index.html").read_text(encoding="utf-8")
for language in ("csv", "tsv"):
    block = re.search(rf'<div class="language-{language} highlight">(.*?)</div>', html, re.S)
    assert block, f"missing highlighted {language} fence"
    assert re.search(r'<span class="ow">[^<]+</span>', block[1]), f"unscoped {language} separator"
    assert '<span class="gs">name</span>' in block[1], f"missing {language} field scope"
    print(f"{language}: separator and field have distinct token scopes")
