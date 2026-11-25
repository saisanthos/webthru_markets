# Deployment

WebThru Markets deploys as four WordPress pages. Each file in `dist/` is a self-contained embed (styles, layout and script) for one page.

| Embed | Page title | Slug | Parent |
|---|---|---|---|
| `dist/1-markets-overview.html` | Markets | `markets` | none |
| `dist/2-markets-india.html` | India | `india` | Markets |
| `dist/3-markets-usa.html` | USA | `usa` | Markets |
| `dist/4-markets-symbol.html` | Symbol | `symbol` | Markets |

## Publishing a page

Requires a WordPress Administrator account. Other roles can't save embeds that contain scripts.

1. Create the page with the title, slug and parent from the table above, then open it with Elementor.
2. In Page Settings, set Page Layout to **Elementor Full Width** and turn on **Hide Title**.
3. Add an **HTML** widget and paste the full contents of the page's embed file.
4. Save as draft, preview, then publish.

With the block editor, use a **Custom HTML** block instead of the Elementor HTML widget.

Add the Markets page to the site's main menu once all four pages are published.

## Homepage section

`dist/5-homepage-intelligence.html` is a self-contained Market Intelligence block for the homepage. It brings its own styles and links into the Markets pages, so publish those first.

1. Open the homepage with Elementor.
2. Add an **HTML** widget where the section should appear (or replace an earlier Markets block with it) and paste the full contents of the file.
3. Update the page.

Use the HTML widget, not the Text Editor widget: the Text Editor can rewrite the script when the widget is opened and saved again.

## Checks after publishing

- `/markets/symbol/?tvwidgetsymbol=BSE:RELIANCE` shows Reliance Industries with an end-of-day note.
- Clicking a stock in the Market overview list opens its symbol page.
- Searching `tcs` with "India (BSE)" selected opens TCS on BSE.

## Configuration

Change these in `src/`, then run `python3 build.py` and republish the affected pages.

| Setting | Where |
|---|---|
| Symbol page address | `var SYMBOL_PAGE` in `src/shared.js` |
| Menu links | `src/nav.html` |
| Accent colour | `--wt-accent` in `src/shared.css` |
| Light or dark widgets | `var THEME` in `src/shared.js` |
| Symbols on each page | `src/pages/<page>.js` |

## Troubleshooting

- **Widgets stay blank.** A performance plugin is delaying or combining the script (WP Rocket "Delay JavaScript execution", LiteSpeed Cache, Autoptimize). Exclude the Markets pages, or `tradingview`, from JavaScript delay, defer and combine, then clear the cache.
- **The embed disappears after saving.** The account isn't an Administrator.
- **Content looks narrow.** Set the Elementor section's Content Width to Full Width.

## Data notes

- NSE data, including the Nifty 50, isn't available through the widgets. Indian stocks use BSE end-of-day prices, and NSE symbols are routed to BSE.
- News coverage isn't available for Indian stocks, so the symbol page hides the News section for them.
- US indices use FOREX.com index CFDs. US stock prices are delayed.
- Heatmap blocks don't currently open the symbol page. Market lists and search do.
- TradingView branding stays on the widgets as a condition of free use.
