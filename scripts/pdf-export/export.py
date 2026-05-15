#!/usr/bin/env python3
"""
Export an Adapty MDX article to a polished, brand-styled PDF.

Usage:
    python export.py <path-to-mdx> [output.pdf]

Renders MDX → styled HTML → PDF via headless Chrome.
"""

from __future__ import annotations

import html as html_lib
import re
import subprocess
import sys
from pathlib import Path

import markdown
from markdown.extensions.tables import TableExtension
from pygments import highlight
from pygments.formatters import HtmlFormatter
from pygments.lexers import TextLexer, get_lexer_by_name
from pygments.util import ClassNotFound

ROOT = Path(__file__).resolve().parent
REPO_ROOT = ROOT.parent.parent
LOGO_SVG_PATH = REPO_ROOT / "public" / "logo.svg"
CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"


def parse_frontmatter(text: str) -> tuple[dict[str, str], str]:
    m = re.match(r"^---\n(.*?)\n---\n(.*)$", text, re.DOTALL)
    if not m:
        return {}, text
    raw, body = m.group(1), m.group(2)
    fm: dict[str, str] = {}
    for line in raw.splitlines():
        if ":" not in line:
            continue
        k, v = line.split(":", 1)
        fm[k.strip()] = v.strip().strip('"').strip("'")
    return fm, body


def render_diff_block(code: str) -> str:
    lines_html: list[str] = []
    for line in code.split("\n"):
        if line.startswith("+++") or line.startswith("---"):
            cls = "ctx"
            body = line
        elif line.startswith("+"):
            cls = "add"
            body = line[1:]
        elif line.startswith("-"):
            cls = "del"
            body = line[1:]
        else:
            cls = "ctx"
            body = line[1:] if line.startswith(" ") else line
        # Use &nbsp; for blank lines so the line still renders with its height.
        escaped = html_lib.escape(body) if body.strip() else "&nbsp;"
        lines_html.append(f'<span class="line {cls}">{escaped}</span>')
    # No newlines between spans — display:block handles line breaks.
    return (
        '<div class="codeblock-wrap">'
        '<div class="codeblock-head">'
        '<span class="dots"><span></span><span></span><span></span></span>'
        '<span class="lang">diff</span>'
        "</div>"
        '<pre class="codeblock diff"><code>' + "".join(lines_html) + "</code></pre>"
        "</div>"
    )


def render_code_block(code: str, lang: str) -> str:
    try:
        lexer = get_lexer_by_name(lang) if lang else TextLexer()
    except ClassNotFound:
        lexer = TextLexer()
    formatter = HtmlFormatter(nowrap=True)
    highlighted = highlight(code, lexer, formatter)
    label = lang or "code"
    return (
        '<div class="codeblock-wrap">'
        '<div class="codeblock-head">'
        '<span class="dots"><span></span><span></span><span></span></span>'
        f'<span class="lang">{html_lib.escape(label)}</span>'
        "</div>"
        f'<pre class="codeblock"><code>{highlighted.rstrip()}</code></pre>'
        "</div>"
    )


CODE_BLOCK_RE = re.compile(
    r"^```([A-Za-z0-9_+-]*)[^\n]*\n(.*?)\n^```",
    re.DOTALL | re.MULTILINE,
)


def replace_code_blocks(body: str) -> tuple[str, dict[str, str]]:
    placeholders: dict[str, str] = {}
    counter = {"i": 0}

    def repl(m: re.Match[str]) -> str:
        lang = (m.group(1) or "").strip()
        code = m.group(2)
        i = counter["i"]
        counter["i"] += 1
        key = f"@@CODEBLOCK{i}@@"
        if lang == "diff":
            placeholders[key] = render_diff_block(code)
        else:
            placeholders[key] = render_code_block(code, lang)
        return key

    return CODE_BLOCK_RE.sub(repl, body), placeholders


def mdx_to_html_body(body: str) -> str:
    # Strip MDX-only constructs that this article doesn't contain but other
    # Adapty articles might (basic safety net): leave them as-is for now.
    body, placeholders = replace_code_blocks(body)

    md = markdown.Markdown(
        extensions=[TableExtension(), "sane_lists", "attr_list", "toc"],
        extension_configs={
            "toc": {
                "toc_depth": "2-2",
                "title": "",
                "anchorlink": False,
                "permalink": False,
            },
        },
        output_format="html5",
    )
    html = md.convert(body)

    for key, snippet in placeholders.items():
        # Markdown may wrap the placeholder paragraph; unwrap it.
        html = re.sub(rf"<p>\s*{re.escape(key)}\s*</p>", snippet, html)
        html = html.replace(key, snippet)
    return html


COVER_TPL = """
<section class="cover">
  <div class="cover-brand">
    {logo}
    <span class="cover-brand-sep"></span>
    <span class="cover-brand-docs">Docs</span>
  </div>
  <div class="cover-eyebrow">{eyebrow}</div>
  <h1 class="cover-title">{title}</h1>
  <p class="cover-subtitle">{subtitle}</p>
  <div class="cover-badges">{badges}</div>
  <div class="cover-meta">
    <div><strong>Platform</strong>{platform}</div>
    <div><strong>SDK Version</strong>{version}</div>
    <div><strong>Document</strong>{document}</div>
  </div>
</section>
"""


def load_logo_svg() -> str:
    """Load the Adapty logo SVG inline so it travels with the rendered HTML."""
    if not LOGO_SVG_PATH.exists():
        return ""
    svg = LOGO_SVG_PATH.read_text(encoding="utf-8")
    # Strip the XML declaration if present and ensure it has the cover class.
    svg = re.sub(r"<\?xml[^>]*\?>\s*", "", svg)
    svg = svg.replace("<svg ", '<svg class="cover-brand-logo" ', 1)
    return svg


def build_cover(fm: dict[str, str], opts: dict[str, str]) -> str:
    title = fm.get("title", "Adapty Documentation")
    subtitle = fm.get("description", "")
    badges_html = "".join(
        f'<span class="badge {b.get("cls", "")}">{html_lib.escape(b["text"])}</span>'
        for b in opts.get("badges", [])
    )
    return COVER_TPL.format(
        logo=load_logo_svg(),
        eyebrow=html_lib.escape(opts.get("eyebrow", "Adapty Docs")),
        title=html_lib.escape(title),
        subtitle=html_lib.escape(subtitle),
        badges=badges_html,
        platform=html_lib.escape(opts.get("platform", "iOS")),
        version=html_lib.escape(opts.get("version", "v4.0 (beta)")),
        document=html_lib.escape(opts.get("document", "Guide")),
    )


HTML_TPL = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>{title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{css_href}">
</head>
<body>
{cover}
<main class="body">
{body}
</main>
</body>
</html>
"""


def detect_options(fm: dict[str, str], source_path: Path) -> dict:
    title = fm.get("title", "")
    lowered = title.lower()

    # Migration guide (the existing v3 → v4 doc)
    if "migrat" in lowered:
        return {
            "eyebrow": "Migration Guide",
            "platform": "iOS",
            "version": "v4.0 (beta)",
            "document": "Migration Guide",
            "badges": [
                {"text": "iOS SDK", "cls": "badge-accent"},
                {"text": "v3 → v4"},
                {"text": "Flow Builder + Paywall Builder"},
            ],
        }

    # Platform integration guides (SwiftUI / UIKit flow setup)
    is_swiftui = "swiftui" in lowered
    is_uikit = "uikit" in lowered
    if is_swiftui or is_uikit:
        ui_label = "SwiftUI" if is_swiftui else "UIKit"
        return {
            "eyebrow": "Integration Guide",
            "platform": f"iOS · {ui_label}",
            "version": "v4.0 (beta)",
            "document": "Integration Guide",
            "badges": [
                {"text": ui_label, "cls": "badge-accent"},
                {"text": "iOS SDK v4 (beta)"},
                {"text": "Flow Builder + Paywall Builder"},
            ],
        }

    # Sensible default
    return {
        "eyebrow": "Adapty Docs",
        "platform": "iOS",
        "version": "v4.0 (beta)",
        "document": "Guide",
        "badges": [],
    }


def build_html(source: Path, css_path: Path) -> str:
    raw = source.read_text(encoding="utf-8")
    fm, body = parse_frontmatter(raw)
    body_html = mdx_to_html_body(body)
    opts = detect_options(fm, source)
    cover_html = build_cover(fm, opts)
    return HTML_TPL.format(
        title=fm.get("metadataTitle") or fm.get("title", "Adapty Docs"),
        css_href=css_path.as_uri(),
        cover=cover_html,
        body=body_html,
    )


def html_to_pdf(html_path: Path, pdf_path: Path) -> None:
    cmd = [
        CHROME,
        "--headless=new",
        "--disable-gpu",
        "--no-pdf-header-footer",
        "--no-sandbox",
        "--hide-scrollbars",
        f"--print-to-pdf={pdf_path}",
        html_path.as_uri(),
    ]
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=60)
    if result.returncode != 0:
        sys.stderr.write(result.stderr)
        raise SystemExit(f"Chrome PDF export failed (exit {result.returncode})")


def main() -> None:
    if len(sys.argv) < 2:
        sys.exit("Usage: export.py <path-to-mdx> [output.pdf]")

    source = Path(sys.argv[1]).resolve()
    if not source.exists():
        sys.exit(f"Source file not found: {source}")

    output = (
        Path(sys.argv[2]).resolve()
        if len(sys.argv) > 2
        else source.with_suffix(".pdf").name
    )
    output = Path(output)
    if not output.is_absolute():
        output = Path.cwd() / output

    css_path = ROOT / "template.css"
    html = build_html(source, css_path)

    html_path = ROOT / "_render.html"
    html_path.write_text(html, encoding="utf-8")

    html_to_pdf(html_path, output)
    print(f"PDF written to {output}")


if __name__ == "__main__":
    main()
