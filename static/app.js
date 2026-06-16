'use strict';

// ── Constants ──────────────────────────────────────────────────────────────
const CATEGORIES = {
  expense: ['Courses', 'Salle de sport', 'Sortie', 'Transport', 'Nourriture', 'Achat', 'Autre'],
  income:  ['Argent de poche', 'Travail', 'Vente', 'Cadeau', 'Autre'],
};

// ── Denomination SVGs ─────────────────────────────────────────────────────
const DENOM_SVGS = {

// Bills ─────────────────────────────────────────────────────────────────────

eur50: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="27" viewBox="0 0 48 27" style="display:block;flex-shrink:0;border-radius:2px">
<defs><linearGradient id="g50" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#f8c83a"/><stop offset="100%" stop-color="#c07810"/></linearGradient></defs>
<rect width="48" height="27" rx="2" fill="url(#g50)" stroke="#9a6010" stroke-width="0.5"/>
<rect x=".7" y=".7" width="46.6" height="25.6" rx="1.4" fill="none" stroke="#fce080" stroke-width=".35" opacity=".7"/>
<circle cx="4" cy="3" r=".8" fill="#7a4808"/><circle cx="7" cy="2" r=".8" fill="#7a4808"/><circle cx="10" cy="1.7" r=".8" fill="#7a4808"/><circle cx="13" cy="2" r=".8" fill="#7a4808"/><circle cx="16" cy="3" r=".8" fill="#7a4808"/>
<rect x="3.5" y="12" width="2" height="12" fill="#7a4808" opacity=".75"/>
<rect x="21" y="12" width="2" height="12" fill="#7a4808" opacity=".75"/>
<path d="M3.5 12 Q12.5 3.5 23 12" fill="none" stroke="#7a4808" stroke-width="1.3"/>
<polygon points="12.5,4 11,7 14,7" fill="#7a4808"/>
<path d="M6.5 22 L6.5 16 Q12.5 11.5 18.5 16 L18.5 22" fill="rgba(0,0,0,.12)" stroke="#7a4808" stroke-width=".6" opacity=".8"/>
<line x1="3" y1="24" x2="23.5" y2="24" stroke="#7a4808" stroke-width=".8"/>
<text x="26.5" y="15" font-size="11" font-family="Georgia,serif" font-weight="bold" fill="#7a4000">50</text>
<text x="26.5" y="23" font-size="4.5" font-family="Arial,sans-serif" fill="#8a5010">&#x20AC; EURO</text>
</svg>`,

eur20: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="27" viewBox="0 0 48 27" style="display:block;flex-shrink:0;border-radius:2px">
<defs><linearGradient id="g20" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#5c8ee0"/><stop offset="100%" stop-color="#254ea0"/></linearGradient></defs>
<rect width="48" height="27" rx="2" fill="url(#g20)" stroke="#1a3880" stroke-width=".5"/>
<rect x=".7" y=".7" width="46.6" height="25.6" rx="1.4" fill="none" stroke="#90b8f8" stroke-width=".35" opacity=".5"/>
<circle cx="4" cy="3" r=".8" fill="#1a3880"/><circle cx="7" cy="2" r=".8" fill="#1a3880"/><circle cx="10" cy="1.7" r=".8" fill="#1a3880"/><circle cx="13" cy="2" r=".8" fill="#1a3880"/><circle cx="16" cy="3" r=".8" fill="#1a3880"/>
<path d="M4 24 L4 13 Q8.5 5.5 13 13 L13 24" fill="rgba(0,0,0,.18)" stroke="#1a3880" stroke-width="1"/>
<path d="M15 24 L15 13 Q19.5 5.5 24 13 L24 24" fill="rgba(0,0,0,.18)" stroke="#1a3880" stroke-width="1"/>
<circle cx="8.5" cy="9" r="2.5" fill="none" stroke="#1a3880" stroke-width=".6"/>
<circle cx="8.5" cy="9" r="1" fill="none" stroke="#1a3880" stroke-width=".4" opacity=".6"/>
<circle cx="19.5" cy="9" r="2.5" fill="none" stroke="#1a3880" stroke-width=".6"/>
<circle cx="19.5" cy="9" r="1" fill="none" stroke="#1a3880" stroke-width=".4" opacity=".6"/>
<line x1="3" y1="24" x2="25" y2="24" stroke="#1a3880" stroke-width=".8"/>
<text x="27" y="15" font-size="11" font-family="Georgia,serif" font-weight="bold" fill="#1a3070">20</text>
<text x="27" y="23" font-size="4.5" font-family="Arial,sans-serif" fill="#2a4880">&#x20AC; EURO</text>
</svg>`,

eur10: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="27" viewBox="0 0 48 27" style="display:block;flex-shrink:0;border-radius:2px">
<defs><linearGradient id="g10" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#e86070"/><stop offset="100%" stop-color="#a02030"/></linearGradient></defs>
<rect width="48" height="27" rx="2" fill="url(#g10)" stroke="#801020" stroke-width=".5"/>
<rect x=".7" y=".7" width="46.6" height="25.6" rx="1.4" fill="none" stroke="#f8a0b0" stroke-width=".35" opacity=".5"/>
<circle cx="4" cy="3" r=".8" fill="#801020"/><circle cx="7" cy="2" r=".8" fill="#801020"/><circle cx="10" cy="1.7" r=".8" fill="#801020"/><circle cx="13" cy="2" r=".8" fill="#801020"/><circle cx="16" cy="3" r=".8" fill="#801020"/>
<rect x="3.5" y="12" width="2.5" height="12" fill="#801020" opacity=".75"/>
<rect x="11" y="12" width="2.5" height="12" fill="#801020" opacity=".75"/>
<rect x="18.5" y="12" width="2.5" height="12" fill="#801020" opacity=".75"/>
<rect x="26" y="12" width="2.5" height="12" fill="#801020" opacity=".75"/>
<path d="M6 12 Q9.25 7.5 12.5 12" fill="rgba(0,0,0,.18)" stroke="#801020" stroke-width=".9"/>
<path d="M13.5 12 Q16.75 7.5 20 12" fill="rgba(0,0,0,.18)" stroke="#801020" stroke-width=".9"/>
<path d="M21 12 Q24.25 7.5 27.5 12" fill="rgba(0,0,0,.18)" stroke="#801020" stroke-width=".9"/>
<rect x="3" y="11" width="3.5" height="1" fill="#801020" opacity=".6"/>
<rect x="10.5" y="11" width="3.5" height="1" fill="#801020" opacity=".6"/>
<rect x="18" y="11" width="3.5" height="1" fill="#801020" opacity=".6"/>
<rect x="25.5" y="11" width="3.5" height="1" fill="#801020" opacity=".6"/>
<line x1="3" y1="24" x2="29" y2="24" stroke="#801020" stroke-width=".8"/>
<text x="31" y="15" font-size="11" font-family="Georgia,serif" font-weight="bold" fill="#801020">10</text>
<text x="31" y="23" font-size="4.5" font-family="Arial,sans-serif" fill="#901828">&#x20AC; EURO</text>
</svg>`,

eur5: `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="27" viewBox="0 0 48 27" style="display:block;flex-shrink:0;border-radius:2px">
<defs><linearGradient id="g5e" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#dcd8c4"/><stop offset="100%" stop-color="#aca898"/></linearGradient></defs>
<rect width="48" height="27" rx="2" fill="url(#g5e)" stroke="#888070" stroke-width=".5"/>
<rect x=".7" y=".7" width="46.6" height="25.6" rx="1.4" fill="none" stroke="#e8e4d0" stroke-width=".35" opacity=".8"/>
<circle cx="4" cy="3" r=".8" fill="#686050"/><circle cx="7" cy="2" r=".8" fill="#686050"/><circle cx="10" cy="1.7" r=".8" fill="#686050"/><circle cx="13" cy="2" r=".8" fill="#686050"/><circle cx="16" cy="3" r=".8" fill="#686050"/>
<rect x="3" y="23" width="22" height="1.5" fill="#686050" opacity=".7"/>
<rect x="4" y="21.5" width="20" height="1.5" fill="#686050" opacity=".6"/>
<rect x="6" y="11.5" width="1.2" height="10" fill="#686050" opacity=".8"/>
<rect x="9.5" y="11.5" width="1.2" height="10" fill="#686050" opacity=".8"/>
<rect x="13" y="11.5" width="1.2" height="10" fill="#686050" opacity=".8"/>
<rect x="16.5" y="11.5" width="1.2" height="10" fill="#686050" opacity=".8"/>
<rect x="20" y="11.5" width="1.2" height="10" fill="#686050" opacity=".8"/>
<rect x="4" y="10" width="19" height="1.5" fill="#686050" opacity=".75"/>
<path d="M4 10 L13.5 4.5 L23 10" fill="rgba(0,0,0,.07)" stroke="#686050" stroke-width=".9"/>
<path d="M11 21.5 L11 16 Q13.5 13 16 16 L16 21.5" fill="rgba(0,0,0,.1)" stroke="#686050" stroke-width=".5"/>
<text x="27" y="15" font-size="12" font-family="Georgia,serif" font-weight="bold" fill="#4a4438">5</text>
<text x="27" y="23" font-size="4.5" font-family="Arial,sans-serif" fill="#5a5448">&#x20AC; EURO</text>
</svg>`,

// Coins ─────────────────────────────────────────────────────────────────────

eur2: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style="display:block;flex-shrink:0">
<defs>
<radialGradient id="c2o" cx="38%" cy="36%"><stop offset="0%" stop-color="#e8e0a0"/><stop offset="55%" stop-color="#c0a020"/><stop offset="100%" stop-color="#886000"/></radialGradient>
<radialGradient id="c2i" cx="40%" cy="38%"><stop offset="0%" stop-color="#f6f6f6"/><stop offset="60%" stop-color="#c0c0c0"/><stop offset="100%" stop-color="#787878"/></radialGradient>
</defs>
<circle cx="13" cy="13" r="12.5" fill="url(#c2i)" stroke="#505050" stroke-width=".4"/>
<circle cx="13" cy="13" r="8.2" fill="url(#c2o)" stroke="#806000" stroke-width=".5"/>
<ellipse cx="9.5" cy="9" rx="3" ry="1.8" fill="rgba(255,255,220,.18)" transform="rotate(-25 9.5 9)"/>
<circle cx="13" cy="1.2" r=".5" fill="#404040"/><circle cx="19.3" cy="3" r=".5" fill="#404040"/><circle cx="23.5" cy="8" r=".5" fill="#404040"/><circle cx="24.8" cy="13" r=".5" fill="#404040"/><circle cx="23.5" cy="18" r=".5" fill="#404040"/><circle cx="19.3" cy="23" r=".5" fill="#404040"/><circle cx="13" cy="24.8" r=".5" fill="#404040"/><circle cx="6.7" cy="23" r=".5" fill="#404040"/><circle cx="2.5" cy="18" r=".5" fill="#404040"/><circle cx="1.2" cy="13" r=".5" fill="#404040"/><circle cx="2.5" cy="8" r=".5" fill="#404040"/><circle cx="6.7" cy="3" r=".5" fill="#404040"/>
<text x="13" y="14.5" text-anchor="middle" font-size="8.5" font-family="Georgia,serif" font-weight="bold" fill="#604000">2</text>
<text x="13" y="20" text-anchor="middle" font-size="5" font-family="Arial,sans-serif" font-weight="bold" fill="#604000">&#x20AC;</text>
</svg>`,

eur1: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style="display:block;flex-shrink:0">
<defs>
<radialGradient id="c1o" cx="38%" cy="36%"><stop offset="0%" stop-color="#f6f6f6"/><stop offset="60%" stop-color="#c0c0c0"/><stop offset="100%" stop-color="#787878"/></radialGradient>
<radialGradient id="c1i" cx="40%" cy="38%"><stop offset="0%" stop-color="#e8e0a0"/><stop offset="55%" stop-color="#c0a020"/><stop offset="100%" stop-color="#886000"/></radialGradient>
</defs>
<circle cx="13" cy="13" r="12.5" fill="url(#c1o)" stroke="#606060" stroke-width=".4"/>
<circle cx="13" cy="13" r="8.2" fill="url(#c1i)" stroke="#706000" stroke-width=".5"/>
<ellipse cx="9.5" cy="9" rx="3" ry="1.8" fill="rgba(255,255,200,.14)" transform="rotate(-25 9.5 9)"/>
<circle cx="13" cy="1.2" r=".5" fill="#605000"/><circle cx="19.3" cy="3" r=".5" fill="#605000"/><circle cx="23.5" cy="8" r=".5" fill="#605000"/><circle cx="24.8" cy="13" r=".5" fill="#605000"/><circle cx="23.5" cy="18" r=".5" fill="#605000"/><circle cx="19.3" cy="23" r=".5" fill="#605000"/><circle cx="13" cy="24.8" r=".5" fill="#605000"/><circle cx="6.7" cy="23" r=".5" fill="#605000"/><circle cx="2.5" cy="18" r=".5" fill="#605000"/><circle cx="1.2" cy="13" r=".5" fill="#605000"/><circle cx="2.5" cy="8" r=".5" fill="#605000"/><circle cx="6.7" cy="3" r=".5" fill="#605000"/>
<text x="13" y="14.5" text-anchor="middle" font-size="8.5" font-family="Georgia,serif" font-weight="bold" fill="#383020">1</text>
<text x="13" y="20" text-anchor="middle" font-size="5" font-family="Arial,sans-serif" font-weight="bold" fill="#383020">&#x20AC;</text>
</svg>`,

ct50: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style="display:block;flex-shrink:0">
<defs><radialGradient id="g50c" cx="38%" cy="36%"><stop offset="0%" stop-color="#fce870"/><stop offset="55%" stop-color="#d4a818"/><stop offset="100%" stop-color="#906800"/></radialGradient></defs>
<circle cx="13" cy="13" r="12.5" fill="url(#g50c)" stroke="#806000" stroke-width=".4"/>
<ellipse cx="9" cy="8.5" rx="3.5" ry="2" fill="rgba(255,255,200,.2)" transform="rotate(-25 9 8.5)"/>
<circle cx="13" cy="1.2" r=".5" fill="#806000"/><circle cx="19.3" cy="3" r=".5" fill="#806000"/><circle cx="23.5" cy="8" r=".5" fill="#806000"/><circle cx="24.8" cy="13" r=".5" fill="#806000"/><circle cx="23.5" cy="18" r=".5" fill="#806000"/><circle cx="19.3" cy="23" r=".5" fill="#806000"/><circle cx="13" cy="24.8" r=".5" fill="#806000"/><circle cx="6.7" cy="23" r=".5" fill="#806000"/><circle cx="2.5" cy="18" r=".5" fill="#806000"/><circle cx="1.2" cy="13" r=".5" fill="#806000"/><circle cx="2.5" cy="8" r=".5" fill="#806000"/><circle cx="6.7" cy="3" r=".5" fill="#806000"/>
<text x="13" y="14" text-anchor="middle" font-size="8" font-family="Georgia,serif" font-weight="bold" fill="#604800">50</text>
<text x="13" y="19.5" text-anchor="middle" font-size="5" font-family="Arial,sans-serif" font-weight="bold" fill="#604800">ct</text>
</svg>`,

ct20: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style="display:block;flex-shrink:0">
<defs><radialGradient id="g20c" cx="38%" cy="36%"><stop offset="0%" stop-color="#fce870"/><stop offset="55%" stop-color="#d4a818"/><stop offset="100%" stop-color="#906800"/></radialGradient></defs>
<circle cx="13" cy="13" r="12.5" fill="url(#g20c)" stroke="#806000" stroke-width=".4"/>
<ellipse cx="9" cy="8.5" rx="3.5" ry="2" fill="rgba(255,255,200,.2)" transform="rotate(-25 9 8.5)"/>
<circle cx="13" cy="1.2" r=".5" fill="#806000"/><circle cx="19.3" cy="3" r=".5" fill="#806000"/><circle cx="23.5" cy="8" r=".5" fill="#806000"/><circle cx="24.8" cy="13" r=".5" fill="#806000"/><circle cx="23.5" cy="18" r=".5" fill="#806000"/><circle cx="19.3" cy="23" r=".5" fill="#806000"/><circle cx="13" cy="24.8" r=".5" fill="#806000"/><circle cx="6.7" cy="23" r=".5" fill="#806000"/><circle cx="2.5" cy="18" r=".5" fill="#806000"/><circle cx="1.2" cy="13" r=".5" fill="#806000"/><circle cx="2.5" cy="8" r=".5" fill="#806000"/><circle cx="6.7" cy="3" r=".5" fill="#806000"/>
<text x="13" y="14" text-anchor="middle" font-size="8" font-family="Georgia,serif" font-weight="bold" fill="#604800">20</text>
<text x="13" y="19.5" text-anchor="middle" font-size="5" font-family="Arial,sans-serif" font-weight="bold" fill="#604800">ct</text>
</svg>`,

ct10: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style="display:block;flex-shrink:0">
<defs><radialGradient id="g10c" cx="38%" cy="36%"><stop offset="0%" stop-color="#fce870"/><stop offset="55%" stop-color="#d4a818"/><stop offset="100%" stop-color="#906800"/></radialGradient></defs>
<circle cx="13" cy="13" r="12.5" fill="url(#g10c)" stroke="#806000" stroke-width=".4"/>
<ellipse cx="9" cy="8.5" rx="3.5" ry="2" fill="rgba(255,255,200,.2)" transform="rotate(-25 9 8.5)"/>
<circle cx="13" cy="1.2" r=".5" fill="#806000"/><circle cx="19.3" cy="3" r=".5" fill="#806000"/><circle cx="23.5" cy="8" r=".5" fill="#806000"/><circle cx="24.8" cy="13" r=".5" fill="#806000"/><circle cx="23.5" cy="18" r=".5" fill="#806000"/><circle cx="19.3" cy="23" r=".5" fill="#806000"/><circle cx="13" cy="24.8" r=".5" fill="#806000"/><circle cx="6.7" cy="23" r=".5" fill="#806000"/><circle cx="2.5" cy="18" r=".5" fill="#806000"/><circle cx="1.2" cy="13" r=".5" fill="#806000"/><circle cx="2.5" cy="8" r=".5" fill="#806000"/><circle cx="6.7" cy="3" r=".5" fill="#806000"/>
<text x="13" y="14" text-anchor="middle" font-size="8" font-family="Georgia,serif" font-weight="bold" fill="#604800">10</text>
<text x="13" y="19.5" text-anchor="middle" font-size="5" font-family="Arial,sans-serif" font-weight="bold" fill="#604800">ct</text>
</svg>`,

ct5: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style="display:block;flex-shrink:0">
<defs><radialGradient id="g5c" cx="38%" cy="36%"><stop offset="0%" stop-color="#e89848"/><stop offset="55%" stop-color="#c06820"/><stop offset="100%" stop-color="#883010"/></radialGradient></defs>
<circle cx="13" cy="13" r="12.5" fill="url(#g5c)" stroke="#702818" stroke-width=".4"/>
<ellipse cx="9" cy="8.5" rx="3.5" ry="2" fill="rgba(255,190,130,.2)" transform="rotate(-25 9 8.5)"/>
<circle cx="13" cy="1.2" r=".5" fill="#702818"/><circle cx="19.3" cy="3" r=".5" fill="#702818"/><circle cx="23.5" cy="8" r=".5" fill="#702818"/><circle cx="24.8" cy="13" r=".5" fill="#702818"/><circle cx="23.5" cy="18" r=".5" fill="#702818"/><circle cx="19.3" cy="23" r=".5" fill="#702818"/><circle cx="13" cy="24.8" r=".5" fill="#702818"/><circle cx="6.7" cy="23" r=".5" fill="#702818"/><circle cx="2.5" cy="18" r=".5" fill="#702818"/><circle cx="1.2" cy="13" r=".5" fill="#702818"/><circle cx="2.5" cy="8" r=".5" fill="#702818"/><circle cx="6.7" cy="3" r=".5" fill="#702818"/>
<text x="13" y="14.5" text-anchor="middle" font-size="9" font-family="Georgia,serif" font-weight="bold" fill="#fff0e0" opacity=".9">5</text>
<text x="13" y="20" text-anchor="middle" font-size="5" font-family="Arial,sans-serif" font-weight="bold" fill="#fff0e0" opacity=".85">ct</text>
</svg>`,

ct2: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style="display:block;flex-shrink:0">
<defs><radialGradient id="g2c" cx="38%" cy="36%"><stop offset="0%" stop-color="#e89848"/><stop offset="55%" stop-color="#c06820"/><stop offset="100%" stop-color="#883010"/></radialGradient></defs>
<circle cx="13" cy="13" r="12.5" fill="url(#g2c)" stroke="#702818" stroke-width=".4"/>
<ellipse cx="9" cy="8.5" rx="3.5" ry="2" fill="rgba(255,190,130,.2)" transform="rotate(-25 9 8.5)"/>
<circle cx="13" cy="1.2" r=".5" fill="#702818"/><circle cx="19.3" cy="3" r=".5" fill="#702818"/><circle cx="23.5" cy="8" r=".5" fill="#702818"/><circle cx="24.8" cy="13" r=".5" fill="#702818"/><circle cx="23.5" cy="18" r=".5" fill="#702818"/><circle cx="19.3" cy="23" r=".5" fill="#702818"/><circle cx="13" cy="24.8" r=".5" fill="#702818"/><circle cx="6.7" cy="23" r=".5" fill="#702818"/><circle cx="2.5" cy="18" r=".5" fill="#702818"/><circle cx="1.2" cy="13" r=".5" fill="#702818"/><circle cx="2.5" cy="8" r=".5" fill="#702818"/><circle cx="6.7" cy="3" r=".5" fill="#702818"/>
<text x="13" y="14.5" text-anchor="middle" font-size="9" font-family="Georgia,serif" font-weight="bold" fill="#fff0e0" opacity=".9">2</text>
<text x="13" y="20" text-anchor="middle" font-size="5" font-family="Arial,sans-serif" font-weight="bold" fill="#fff0e0" opacity=".85">ct</text>
</svg>`,

ct1: `<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" style="display:block;flex-shrink:0">
<defs><radialGradient id="g1c" cx="38%" cy="36%"><stop offset="0%" stop-color="#e89848"/><stop offset="55%" stop-color="#c06820"/><stop offset="100%" stop-color="#883010"/></radialGradient></defs>
<circle cx="13" cy="13" r="12.5" fill="url(#g1c)" stroke="#702818" stroke-width=".4"/>
<ellipse cx="9" cy="8.5" rx="3.5" ry="2" fill="rgba(255,190,130,.2)" transform="rotate(-25 9 8.5)"/>
<circle cx="13" cy="1.2" r=".5" fill="#702818"/><circle cx="19.3" cy="3" r=".5" fill="#702818"/><circle cx="23.5" cy="8" r=".5" fill="#702818"/><circle cx="24.8" cy="13" r=".5" fill="#702818"/><circle cx="23.5" cy="18" r=".5" fill="#702818"/><circle cx="19.3" cy="23" r=".5" fill="#702818"/><circle cx="13" cy="24.8" r=".5" fill="#702818"/><circle cx="6.7" cy="23" r=".5" fill="#702818"/><circle cx="2.5" cy="18" r=".5" fill="#702818"/><circle cx="1.2" cy="13" r=".5" fill="#702818"/><circle cx="2.5" cy="8" r=".5" fill="#702818"/><circle cx="6.7" cy="3" r=".5" fill="#702818"/>
<text x="13" y="14.5" text-anchor="middle" font-size="9" font-family="Georgia,serif" font-weight="bold" fill="#fff0e0" opacity=".9">1</text>
<text x="13" y="20" text-anchor="middle" font-size="5" font-family="Arial,sans-serif" font-weight="bold" fill="#fff0e0" opacity=".85">ct</text>
</svg>`,

};

// ── State ──────────────────────────────────────────────────────────────────
let inventoryData = [];
let currentType   = 'expense';

// ── Helpers ────────────────────────────────────────────────────────────────
function fmt(cents) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(cents / 100);
}

function fmtDate(str) {
  const d = new Date(str.replace(' ', 'T'));
  const date = d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
  const time = d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  return `${date} ${time}`;
}

// ── Inventory ──────────────────────────────────────────────────────────────
async function loadInventory() {
  const res  = await fetch('/api/inventory');
  const data = await res.json();
  inventoryData = data.items;
  renderInventory(data.items);
  setTotal(data.total);
}

function renderInventory(items) {
  const bills = items.filter(i => i.type === 'bill');
  const coins = items.filter(i => i.type === 'coin');
  document.getElementById('bills-list').innerHTML = bills.map(rowHTML).join('');
  document.getElementById('coins-list').innerHTML = coins.map(rowHTML).join('');

  document.querySelectorAll('.btn-minus').forEach(btn =>
    btn.addEventListener('click', () => changeQty(btn.dataset.id, -1))
  );
  document.querySelectorAll('.btn-plus').forEach(btn =>
    btn.addEventListener('click', () => changeQty(btn.dataset.id, +1))
  );
}

function rowHTML(item) {
  const sub    = item.value * item.quantity;
  const subStr = sub > 0 ? fmt(sub) : '—';
  return `
  <div class="denom-row" data-id="${item.id}">
    <div class="denom-visual">${DENOM_SVGS[item.id] || ''}<span class="denom-label">${item.label}</span></div>
    <div class="denom-controls">
      <button class="btn-round btn-minus" data-id="${item.id}" aria-label="Retirer un ${item.label}">&#x2212;</button>
      <span class="denom-qty" id="qty-${item.id}">${item.quantity}</span>
      <button class="btn-round btn-plus"  data-id="${item.id}" aria-label="Ajouter un ${item.label}">&#x2B;</button>
    </div>
    <span class="denom-subtotal ${sub > 0 ? 'nonzero' : ''}" id="sub-${item.id}">${subStr}</span>
  </div>`;
}

const saveTimers = {};

function changeQty(id, delta) {
  const item = inventoryData.find(i => i.id === id);
  if (!item) return;

  item.quantity = Math.max(0, item.quantity + delta);

  // Instant DOM update
  const qtyEl = document.getElementById(`qty-${id}`);
  const subEl = document.getElementById(`sub-${id}`);
  if (qtyEl) qtyEl.textContent = item.quantity;
  if (subEl) {
    const sub = item.value * item.quantity;
    subEl.textContent = sub > 0 ? fmt(sub) : '—';
    subEl.className   = `denom-subtotal ${sub > 0 ? 'nonzero' : ''}`;
  }

  // Recalculate total immediately
  const total = inventoryData.reduce((s, i) => s + i.value * i.quantity, 0);
  setTotal(total);

  // Debounced API save (300 ms)
  clearTimeout(saveTimers[id]);
  saveTimers[id] = setTimeout(() => {
    fetch('/api/inventory', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ denomination: id, quantity: item.quantity }),
    }).catch(console.error);
  }, 300);
}

function setTotal(cents) {
  document.getElementById('total-cash').textContent = fmt(cents);
}

// ── Transactions ───────────────────────────────────────────────────────────
async function loadTransactions() {
  const res  = await fetch('/api/transactions');
  const data = await res.json();
  renderTransactions(data.transactions);
  renderSummary(data.monthly);
}

function renderTransactions(list) {
  const container = document.getElementById('transactions-list');
  if (!list.length) {
    container.innerHTML = '<div class="empty-state">Aucune transaction pour le moment</div>';
    return;
  }

  container.innerHTML = list.map(t => {
    const isIncome = t.type === 'income';
    const sign     = isIncome ? '+' : '−';
    const descHTML = t.description ? `<div class="tx-desc">${esc(t.description)}</div>` : '';
    return `
    <div class="transaction-item">
      <div class="tx-icon ${t.type}">${sign}</div>
      <div class="tx-info">
        <div class="tx-category">${esc(t.category)}</div>
        ${descHTML}
        <div class="tx-date">${fmtDate(t.created_at)}</div>
      </div>
      <div class="tx-amount ${t.type}">${sign}${fmt(t.amount)}</div>
      <button class="btn-delete" onclick="deleteTx(${t.id})" aria-label="Supprimer">&#x2715;</button>
    </div>`;
  }).join('');
}

function renderSummary(m) {
  document.getElementById('monthly-expense').textContent = fmt(m.expense || 0);
  document.getElementById('monthly-income').textContent  = fmt(m.income  || 0);
  const balEl = document.getElementById('monthly-balance');
  const bal   = m.balance || 0;
  balEl.textContent = fmt(Math.abs(bal));
  balEl.className   = `summary-amount ${bal >= 0 ? 'positive-color' : 'negative-color'}`;
}

async function deleteTx(id) {
  await fetch(`/api/transactions/${id}`, { method: 'DELETE' });
  loadTransactions();
}

// XSS safety: escape user-supplied strings before innerHTML insertion
function esc(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ── Type Toggle ────────────────────────────────────────────────────────────
function setType(type) {
  currentType = type;

  document.querySelectorAll('.toggle-btn').forEach(b =>
    b.classList.toggle('active', b.dataset.type === type)
  );

  const select = document.getElementById('category');
  select.innerHTML = CATEGORIES[type].map(c => `<option value="${c}">${c}</option>`).join('');

  const btn = document.getElementById('submit-btn');
  if (type === 'expense') {
    btn.textContent = 'Valider la dépense';
    btn.className   = 'btn-submit expense-submit';
  } else {
    btn.textContent = 'Valider le revenu';
    btn.className   = 'btn-submit income-submit';
  }
}

document.querySelectorAll('.toggle-btn').forEach(btn =>
  btn.addEventListener('click', () => setType(btn.dataset.type))
);

// ── Transaction Form Submit ────────────────────────────────────────────────
document.getElementById('transaction-form').addEventListener('submit', async e => {
  e.preventDefault();

  const amountStr = document.getElementById('amount').value.trim();
  const amount    = parseFloat(amountStr.replace(',', '.'));
  const category  = document.getElementById('category').value;
  const desc      = document.getElementById('description').value.trim();

  if (!amount || amount <= 0) {
    document.getElementById('amount').focus();
    return;
  }

  const btn = document.getElementById('submit-btn');
  btn.disabled = true;

  try {
    const res = await fetch('/api/transactions', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify({ type: currentType, amount, category, description: desc }),
    });
    if (res.ok) {
      document.getElementById('amount').value      = '';
      document.getElementById('description').value = '';
      loadTransactions();
    }
  } finally {
    btn.disabled = false;
  }
});

// ── Splash ─────────────────────────────────────────────────────────────────
let _splashDone = false;

function hideSplash() {
  if (_splashDone) return;
  _splashDone = true;

  const el = document.getElementById('splash');
  if (!el) return;

  el.classList.add('hidden');

  // Remove from DOM once the CSS fade-out ends.
  // iOS Safari sometimes skips transitionend, so the setTimeout is the safety net.
  const remove = () => { if (el.parentNode) el.parentNode.removeChild(el); };
  el.addEventListener('transitionend', remove, { once: true });
  setTimeout(remove, 500); // 350ms transition + 150ms buffer
}

// ── Init ───────────────────────────────────────────────────────────────────
setType('expense');

// Primary: hide as soon as both API calls finish (success or error)
Promise.all([loadInventory(), loadTransactions()]).then(hideSplash).catch(hideSplash);

// Fallback 1: window load event — fires after all resources are ready on iOS
window.addEventListener('load', hideSplash, { once: true });

// Fallback 2: hard cap — splash never stays longer than 3 s no matter what
setTimeout(hideSplash, 3000);
