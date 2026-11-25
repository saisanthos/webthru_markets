"""Builds the paste-ready WordPress snippets in dist/ from the files in src/.

Run:  python3 build.py
"""
import pathlib

ROOT = pathlib.Path(__file__).parent
SRC = ROOT / "src"
DIST = ROOT / "dist"

# key: (output file, title, where it goes, page chrome)
# "markets" chrome wraps the page in the Markets menu, ticker and footer.
# "section" chrome is a standalone block with its own styles, for the homepage.
PAGES = {
    "home": ("1-markets-overview", "Markets overview", "the page at /markets/", "markets"),
    "india": ("2-markets-india", "Indian stock market", "the page at /markets/india/", "markets"),
    "usa": ("3-markets-usa", "US stock market", "the page at /markets/usa/", "markets"),
    "symbol": ("4-markets-symbol", "Symbol details", "the page at /markets/symbol/", "markets"),
    "intelligence": ("5-homepage-intelligence", "Market Intelligence section", "the homepage", "section"),
}

shared_css = (SRC / "shared.css").read_text()
section_css = (SRC / "intelligence.css").read_text()
js = (SRC / "shared.js").read_text()
nav = (SRC / "nav.html").read_text()
footer = (SRC / "footer.html").read_text()

DIST.mkdir(exist_ok=True)

for key, (fname, title, where, chrome) in PAGES.items():
    body = (SRC / "pages" / f"{key}.html").read_text()
    page_js = (SRC / "pages" / f"{key}.js").read_text()
    script = js.replace("  /*PAGE*/\n", page_js)
    assert "/*PAGE*/" not in script
    header = f"<!-- WebThru Markets: {title}. Paste into an Elementor HTML widget on {where} -->\n"
    if chrome == "markets":
        page_nav = nav
        for k in ("HOME", "INDIA", "USA"):
            page_nav = page_nav.replace("{{ON_%s}}" % k, "on" if k.lower() == key else "")
        snippet = (
            header
            + f"<style>\n{shared_css}</style>\n"
            + f'<div class="wt-mkt">\n{page_nav}{body}{footer}</div>\n'
            + f"<script>\n{script}</script>\n"
        )
    else:
        snippet = header + f"<style>\n{section_css}</style>\n" + body + f"<script>\n{script}</script>\n"
    (DIST / f"{fname}.html").write_text(snippet)
    print("built", fname, len(snippet), "bytes")
