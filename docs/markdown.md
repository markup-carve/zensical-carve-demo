---
title: Markdown, for contrast
description: The same constructs, written in Markdown with the extension stack Zensical enables
---

# Markdown, for contrast

This page is an ordinary `.md` file. Everything on it is Markdown plus the 22
extensions `zensical new` turns on. It is here so the comparison is concrete
rather than asserted.

## The same marks

| Written | Renders | Extension it needs |
| --- | --- | --- |
| `*italic*` | *italic* | core |
| `**bold**` | **bold** | core |
| `^^underline^^` | ^^underline^^ | `pymdownx.caret` |
| `~~strike~~` | ~~strike~~ | `pymdownx.tilde` |
| `==highlight==` | ==highlight== | `pymdownx.mark` |
| `H~2~O`, `mc^2^` | H~2~O, mc^2^ | `pymdownx.tilde`, `pymdownx.caret` |

Note the last three rows. Superscript is `^x^` and underline is `^^x^^`;
subscript is `~x~` and strikethrough is `~~x~~`. The same two characters carry
four meanings by repetition count, which is the thing Carve's braced `{^x^}` and
`{,x,}` remove.

## A Carve block inside this page

The other seam the plugin offers is a custom fence, so a Markdown page can hold
Carve where it helps:

```carve
Here */bold italic/* and _underline_ and =highlight= all work, and none of them
mean this in the Markdown around it.

:: A definition list
:  With explicit markers.
```

Back in Markdown, `**this**` is bold because `**` is Markdown's spelling. Inside
the Carve block above, `**` would have rendered as literal asterisks.

## Admonitions and tabs

!!! note "An admonition"

    Markdown spells this with `!!!` and an indented body.

=== "First tab"

    Content tabs are `===` plus an indented body.

=== "Second tab"

    Carve spells both of these as `:::` containers.

## What this page cannot do

- a table cannot mark a header cell, span a row, or carry a caption
- there is no comment syntax; the convention is an HTML comment
- heading attributes go at the end of the heading line, where they are ambiguous
  with a heading that genuinely ends in braces

Those are the gaps the Carve pages fill.
