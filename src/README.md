# Goismo Global Website

A modern React + Vite + Tailwind CSS website for Goismo's global operations — covering Data Privacy (GoSeqr), Cybersecurity (GoSeqr), and Digital Accreditation (GoKred).

## Tech Stack

- **React 18** — UI framework
- **Vite 5** — Build tool & dev server
- **Tailwind CSS 3.4** — Utility-first styling
- **DM Sans** — Typography (Google Fonts)

## Features

- 🌗 **Dark / Light theme** toggle with full coverage
- 🖼️ **SVG logos** — inline with theme-aware coloring (white text in dark, navy blue #0F2774 in light)
- 📱 **Fully responsive** — mobile-first with hamburger nav
- ✨ **Animations** — scroll reveals, shiny text, gradient orbs, animated counters
- 🗂️ **4 pages** — Home, Products, About, Contact
- 🔒 **Content from goismo.com** — adapted for global operations

## Quick Start

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
goismo-global/
├── public/
│   ├── logo-white.svg      # Light theme logo (white bg, blue text)
│   └── logo-blue.svg       # Dark theme logo (blue bg, white text)
├── src/
│   ├── App.jsx              # Main app with all pages & components
│   ├── index.css            # Tailwind + custom styles
│   └── main.jsx             # React entry point
├── index.html               # HTML shell
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── README.md
```

## Pages

| Page       | Route         | Content                                    |
|------------|---------------|--------------------------------------------|
| Home       | `/`           | Hero, trust badges, products preview, features, quote, CTA |
| Products   | `/products`   | GoSeqr Privacy, GoSeqr Cybersecurity, GoKred — tabbed detail view + regulations grid |
| About      | `/about`      | Mission, stats, brand logo badge, timeline, values |
| Contact    | `/contact`    | 3 office locations, email/phone, contact form |

## Offices

- 🇸🇪 **Göteborg, Sweden** — Herkulesgatan 3A
- 🇺🇸 **Oakland, CA, USA** — 1999 Harrison St, Suite 1800
- 🇮🇳 **Bangalore, India** — 441, 9th Main, AECS B Block

## License

© 2025 GOISMO. All Rights Reserved.
