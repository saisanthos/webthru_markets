  THEME = 'dark';

  mount('mi-tape', 'ticker-tape', {
    symbols: [
      ['BSE:SENSEX', 'Sensex'], ['FOREXCOM:SPXUSD', 'S&P 500'], ['FOREXCOM:NSXUSD', 'Nasdaq 100'],
      ['FOREXCOM:DJI', 'Dow Jones'], ['FX_IDC:USDINR', 'USD/INR'], ['OANDA:XAUUSD', 'Gold'],
      ['BINANCE:BTCUSDT', 'Bitcoin']
    ].map(function (x) { return { proName: x[0], title: x[1] }; }),
    showSymbolLogo: true,
    displayMode: 'adaptive',
    largeChartUrl: SYMBOL_PAGE
  });

  mount('mi-overview', 'market-overview', {
    dateRange: '12M',
    showChart: true,
    showSymbolLogo: true,
    showFloatingTooltip: false,
    width: '100%',
    height: '100%',
    largeChartUrl: SYMBOL_PAGE,
    plotLineColorGrowing: 'rgba(192, 132, 252, 1)',
    plotLineColorFalling: 'rgba(192, 132, 252, 1)',
    belowLineFillColorGrowing: 'rgba(192, 132, 252, 0.14)',
    belowLineFillColorFalling: 'rgba(192, 132, 252, 0.14)',
    belowLineFillColorGrowingBottom: 'rgba(192, 132, 252, 0)',
    belowLineFillColorFallingBottom: 'rgba(192, 132, 252, 0)',
    gridLineColor: 'rgba(38, 38, 64, 0)',
    scaleFontColor: 'rgba(163, 166, 191, 1)',
    symbolActiveColor: 'rgba(142, 162, 255, 0.12)',
    tabs: [
      ['India', [['BSE:SENSEX', 'Sensex'], ['BSE:RELIANCE', 'Reliance Industries'], ['BSE:HDFCBANK', 'HDFC Bank'],
        ['BSE:TCS', 'TCS'], ['BSE:INFY', 'Infosys']]],
      ['USA', [['FOREXCOM:SPXUSD', 'S&P 500'], ['FOREXCOM:NSXUSD', 'Nasdaq 100'], ['FOREXCOM:DJI', 'Dow Jones 30'],
        ['NASDAQ:NVDA', 'Nvidia'], ['NASDAQ:AAPL', 'Apple']]],
      ['Commodities', [['OANDA:XAUUSD', 'Gold'], ['OANDA:XAGUSD', 'Silver'], ['OANDA:WTICOUSD', 'WTI crude oil']]],
      ['Crypto', [['BINANCE:BTCUSDT', 'Bitcoin'], ['BINANCE:ETHUSDT', 'Ethereum'], ['BINANCE:SOLUSDT', 'Solana']]]
    ].map(function (t) {
      return { title: t[0], originalTitle: t[0], symbols: t[1].map(function (x) { return { s: x[0], d: x[1] }; }) };
    })
  }, 440);

  // Stock lookup
  var miForm = document.getElementById('mi-search');
  if (miForm) {
    miForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var q = document.getElementById('mi-q');
      var v = q.value.trim().toUpperCase().replace(/\s+/g, '');
      if (!v) { q.focus(); return; }
      if (v.indexOf(':') === -1 && document.getElementById('mi-market').value === 'IN') v = 'BSE:' + v;
      if (!SYMBOL_RE.test(v)) { q.value = ''; q.placeholder = 'Letters and numbers only'; q.focus(); return; }
      location.href = symbolUrl(v);
    });
  }

  // "Analytics for finance" links scroll to the contact form when the page has one; otherwise they open email.
  function contactHeading() {
    var hs = document.querySelectorAll('h1, h2, h3');
    for (var i = 0; i < hs.length; i++) {
      if (/let.s connect|get in touch/i.test(hs[i].textContent)) return hs[i];
    }
    return null;
  }
  var links = document.querySelectorAll('#mi-contact, .wt-mi .mi-contact-link');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function (e) {
      var target = contactHeading();
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  }
