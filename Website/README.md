# Eifel-Kurier – Website

Offizielle Website für **Eifel-Kurier**, ein Logistik- und Kurierunternehmen aus der Vulkaneifel.

## Struktur

```
├── index.html                  # Startseite
├── robots.txt                  # Suchmaschinen-Steuerung
├── sitemap.xml                 # XML-Sitemap
├── pages/
│   ├── ueber-uns.html          # Über uns
│   ├── leistungen.html         # Leistungen
│   ├── getraenkelogistik.html  # Getränkelogistik
│   ├── eventlogistik.html      # Eventlogistik & Motorsport
│   ├── kontakt.html            # Kontakt & Formular
│   ├── impressum.html          # Impressum (§ 5 TMG)
│   ├── datenschutz.html        # Datenschutzerklärung
│   └── agb.html                # Allgemeine Geschäftsbedingungen
├── css/
│   ├── main.css                # Reset, Custom Properties, Basis
│   ├── nav.css                 # Navigation & Header
│   ├── hero.css                # Hero-Sektionen, Page-Header
│   ├── components.css          # Cards, Buttons, Formulare, Footer
│   ├── animations.css          # Intersection Observer Klassen
│   ├── pages.css               # Seitenspezifische Styles, Legal-Content
│   └── cookie-consent.css      # Cookie-Banner & Einstellungs-Modal
├── js/
│   ├── nav.js                  # Sticky-Nav, Hamburger-Menü
│   ├── animations.js           # Scroll-Animationen, Counter
│   ├── hero.js                 # Canvas-Partikel-Animation
│   └── cookie-consent.js       # DSGVO-Cookie-Banner (Accept/Reject/Einstellungen)
└── images/
    ├── logo.png
    ├── favicon-32.png
    ├── apple-touch-icon.png
    ├── motorsport.jpg
    ├── motorsport-publikum.jpg
    ├── lkw-seitlich.png
    ├── transport-auto.jpg
    ├── landkarte-liefergebiet.png
    └── transportanfrage.png
```

## Cookie-Banner

DSGVO-konformer Cookie-Banner (`js/cookie-consent.js`, `css/cookie-consent.css`): Kategorien
Notwendig (immer aktiv), Statistik, Marketing. Einwilligung wird in `localStorage`
(`ekCookieConsent`) gespeichert. Erneut öffnen über den Footer-Link „Cookie-Einstellungen“
oder den schwebenden Button unten links.

## Technologie

- Reines HTML5, CSS3, Vanilla JavaScript
- Keine Frameworks, kein Build-Tool
- Google Fonts: Inter
- Animationen: Intersection Observer API
- Responsive: Mobile-first, getestet ab 320px

## Kontakt

**Eifel-Kurier**  
Neunkirchener Str. 23, 54550 Daun  
Tel: 0800 3200 515 (kostenfrei)  
Mail: info@eifel-kurier.de
