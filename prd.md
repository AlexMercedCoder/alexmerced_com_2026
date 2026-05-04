# AlexMerced.com — Product Requirements Document (PRD)

> **Version:** 1.0  
> **Date:** May 4, 2026  
> **Goal:** Rebuild AlexMerced.com as a premium, SEO-optimized portal into the professional and personal world of Alex Merced.

---

## 1. Executive Summary

AlexMerced.com will be rebuilt as a **single unified portal** that consolidates content currently fragmented across multiple domains (books.alexmerced.com, whoisalexmerced.com, alexmerced.com, alexmercedcoder.dev) into one cohesive, visually stunning experience. The site will have a **dual-identity architecture**: a **Professional** side branding Alex as a leading voice in Data Lakehouses and AI, and a **Personal** side celebrating creativity and personal autonomy.

### Sites Being Consolidated

| Current Site | Content | Disposition |
|---|---|---|
| alexmerced.com | Link-in-bio (Data, Web, Opinion, Music) | **Replaced** by new portal |
| alexmercedcoder.dev | Professional portfolio (skills, projects, books) | Content **absorbed** into Professional section |
| whoisalexmerced.com | Biographical timeline (early life → DevRel) | Content **absorbed** into About/Story section |
| books.alexmerced.com | 35+ book catalog (Tech, Economics, Fiction) | Content **absorbed** into Books sections |

### External Sites Linked (Not Consolidated)
- **alexmerced.blog** → Professional blog (linked prominently)
- **loveatarian.substack.com** → Personal opinion blog (linked in Personal section)
- **Spotify podcasts** → Professional and personal podcasts (embedded/linked)

---

## 2. Information Architecture

The site uses a **single-page app** with distinct visual zones for Professional and Personal content, connected by a shared hero and navigation.

```
┌─────────────────────────────────────────┐
│              NAVIGATION                 │
│  Home | Professional | Personal | About │
├─────────────────────────────────────────┤
│              HERO SECTION               │
│  "Alex Merced" + Tagline + Dual CTAs    │
│  [Professional World] [Personal World]  │
├─────────────────────────────────────────┤
│         PROFESSIONAL SECTION            │
│  ├─ Expertise & Positioning             │
│  ├─ Featured Books (Tech/AI)            │
│  ├─ Open Source Projects                │
│  ├─ Blog & Podcast Links               │
│  └─ Speaking & Social Proof             │
├─────────────────────────────────────────┤
│           PERSONAL SECTION              │
│  ├─ Creative Philosophy                 │
│  ├─ Music (links to platforms)          │
│  ├─ Opinion Books & Blog                │
│  ├─ Fiction Books                       │
│  └─ Podcasts (Opinion/Economics)        │
├─────────────────────────────────────────┤
│            ABOUT / STORY                │
│  Condensed timeline from whoisalexmerced│
├─────────────────────────────────────────┤
│              FOOTER                     │
│  All socials, contact, copyright        │
└─────────────────────────────────────────┘
```

---

## 3. Content Strategy

### 3.1 Hero Section
- **Headline:** Alex Merced
- **Sub-headline:** Data Lakehouse & AI Expert · Author · Creator
- **Tagline:** "Empowering through education, technology, and optimism."
- **Dual CTAs:**
  - `[Explore Professional]` → scrolls to Professional section
  - `[Explore Personal]` → scrolls to Personal section

### 3.2 Professional Section — "The Expert"

**Positioning Statement:** *"A leading voice in Data Lakehouse architecture, Apache Iceberg, and AI — empowering developers and data teams worldwide through books, open source, and education."*

#### 3.2.1 Expertise & Credentials
- Head of Developer Relations at Dremio (2025 CEO Award Winner)
- O'Reilly & Manning Author
- LinkedIn Learning Instructor
- Creator of DataLakehouseHub.com
- Core expertise: Apache Iceberg, Apache Polaris, Data Lakehouse Architecture, Agentic AI, DataOps

#### 3.2.2 Featured Professional Books (Highlight Top 3-5, Link to Full Catalog)

**Flagship (Publisher Books):**
1. *Apache Iceberg: The Definitive Guide* (O'Reilly) — [Amazon](https://www.amazon.com/dp/1098148622)
2. *Apache Polaris: The Definitive Guide* (O'Reilly) — [Amazon](https://www.amazon.com/dp/B0FBRJ7J1Y)
3. *Architecting an Apache Iceberg Lakehouse* (Manning) — [Amazon](https://www.amazon.com/dp/1633435105)

**Self-Published Tech (Full list on a "All Books" section/page):**
4. *AI-Ready Data: Designing Data Platforms for LLMs, Agents, and RAG*
5. *The AI Engineering Handbook*
6. *The 2026 Guide to Lakehouses, Apache Iceberg and Agentic AI*
7. *The Book on Agentic Analytics*
8. *The Book on Using Apache Iceberg with Python*
9. *Enabling Agentic Analytics with Apache Iceberg and Dremio*
10. *Using AI Agents for Data Engineering and Data Analysis*
11. *The 2026 Guide to AI-Assisted Development*
12. *Apache Iceberg for Agentic AI*
13. *The Agentic Enterprise*
14. *Constructing Context and Semantics for AI Agents*
15. *The Open Source Lakehouse*
16. *Evaluating AI Systems: Testing LLMs, RAG, and Agents*
17. *The Economics of Labor in the AI Era*
18. *Governing AI Systems*
19. *Shipping AI: From Prototype to Production Systems*
20. *Building Knowledge Systems for AI*
21. *The AI Lakehouse*
22. *AI Application Architecture*
23. *The Economics of AI: Cost, Latency, and Infrastructure Tradeoffs*

#### 3.2.3 Open Source Projects
| Project | Description |
|---|---|
| Pangolin | Open-source Data Lakehouse Catalog (Rust) |
| Apache Iceberg UI | Desktop app for browsing/querying Iceberg Catalogs |
| Iceframe | Dataframe library & AI Agent for Apache Iceberg (Python) |
| DremioFrame | Specialized dataframe library for Dremio Cloud |
| Dremio Python CLI | Python CLI for Dremio Software and Cloud |
| SencilloDB | Lightweight JSON-based JavaScript datastore |

#### 3.2.4 Professional Content Links
- **Blog:** [alexmerced.blog](https://alexmerced.blog) — "Alex Merced's Data, Dev and AI Blog"
- **Podcast:** [Alex Merced's Tech Podcast](https://open.spotify.com/show/2PRDrWVpgDvKxN6n1oUsJF) (Spotify)
- **Data YouTube:** [@alexmerceddata](https://www.youtube.com/@alexmerceddata)
- **Web Dev YouTube:** [@alexmercedcoder](https://www.youtube.com/@alexmercedcoder)
- **Substack (Data):** [amdatalakehouse.substack.com](https://amdatalakehouse.substack.com/)
- **Medium:** [alexmercedtech](https://medium.com/@alexmercedtech)
- **LinkedIn Newsletter:** [Data Lakehouse Bytes with Alex](https://www.linkedin.com/newsletters/data-lakehouse-bytes-with-alex-7049465875728400385/)
- **DataLakehouseHub:** [datalakehousehub.com](https://main.datalakehousehub.com)

#### 3.2.5 Speaking Engagements (Social Proof)
Conference appearances: Oredev, Data Council (Now AI Council), Data Day Texas, Confluent Current, DataEngBytes, SQLBits, P99Conf, Subsurface, OSA Con and more

---

### 3.3 Personal Section — "The Creator"

**Positioning Statement:** *"Creativity and personal autonomy are the foundations of a meaningful life. Through music, fiction, and ideas — exploring what it means to think freely."*

#### 3.3.1 Music
Links to music platforms:
- **YouTube (Music):** [AlexMercedMusic](https://www.youtube.com/user/AlexMercedMusic)
- **SoundCloud:** [alexmerced](https://soundcloud.com/alexmerced)
- **ReverbNation:** [alexmerced](https://www.reverbnation.com/alexmerced)
- **Facebook (Music):** [AlexMercedMusic](https://www.facebook.com/AlexMercedMusic/)
- **Playlists:**
  - [Original Guitar & Electronic](https://www.youtube.com/playlist?list=PL0DCC201C0F84EB13)
  - [AI Revitalized Productions](https://www.youtube.com/playlist?list=PL_Jk7a1xK5B9_BbyWoAvFc)
  - [Favorite Songs](https://www.youtube.com/playlist?list=PL2329BED4F2295CAD)

#### 3.3.2 Opinion & Philosophy
- **Blog:** [The Lovatarian (Substack)](https://loveatarian.substack.com/) — "A Libertarianism that Unites with Kindness"
- **Podcast — Opinions of Alex Merced:** [Spotify](https://open.spotify.com/show/5cYbdb4q40zo0u4iHjZd9x)
- **Podcast — Economics and Finance:** [Spotify](https://open.spotify.com/show/2V35nvmXHyMbA5SV1mQgh4)

#### 3.3.3 Opinion/Philosophy Books
1. *Economic Ideas: From Beginning to Early 2026* — [Amazon](https://www.amazon.com/dp/B0GQQ68F63)
2. *The Field Guide to Libertarianism* — [Amazon](https://www.amazon.com/dp/B0GQV4CK5B)
3. *The Libertarian Heart* — [Amazon](https://www.amazon.com/dp/035975211X)
4. *Profits are Generosity, Entrepreneurship is Philanthropy* — [Amazon](https://www.amazon.com/dp/1387798421)

#### 3.3.4 Fiction Books
1. *The Semantic Rebellion* — [Amazon](https://www.amazon.com/dp/B0GPMNX78W)
2. *The Emperors of A.I. Valley* — [Amazon](https://www.amazon.com/dp/B0GQHKF4ZT)
3. *The Federation of Tides* — [Amazon](https://www.amazon.com/dp/B0GPRBTV6W)
4. *Plastic Punk* — [Amazon](https://www.amazon.com/dp/B0GQGRFW2H)
5. *Embers of Claim* (Trilogy Book 1) — [Amazon](https://www.amazon.com/dp/B0GQGW7VCY)
6. *Crowns and Wings* (Trilogy Book 2) — [Amazon](https://www.amazon.com/dp/B0GQGHYL79)
7. *Thrones of Ash and Sky* (Trilogy Book 3) — [Amazon](https://www.amazon.com/dp/B0GQCHRYHV)
8. *Tales of Fur and Sky: Echoes of the Ages* — [Amazon](https://www.amazon.com/dp/B0GQGRGH93)

---

### 3.4 About / Story Section
Condensed biographical timeline from whoisalexmerced.com:
- **Early Life:** Born June 30, 1985, Hartford CT. Guatemalan/Puerto Rican heritage. Howell Cheney Technical HS (Microcomputer, Guitar Club, Mathletes, STAR Robotics).
- **Music:** Guitar, trombone, songwriting, electronic music production.
- **College (2003-2007):** Bowling Green State University — Marketing & Popular Culture. Radio (WBGU-FM). Founded Fashionably Numb Music and The Gamers Lounge.
- **NYC & Finance (2008-2019):** Trainer at Greico Financial Training. A decade teaching economics and finance.
- **Public Service:** Ran for office 3 times. Vice Chair of LNC 2018-2020.
- **Tech Transition (2019):** Created GrokOverflow.com. Taught at General Assembly. Worked at Crossfield Digital.
- **Developer Advocacy (2021-Present):** Head of DevRel at Dremio. Global speaker. 35+ published books.

---

## 4. Design System

### 4.1 Color Palette
Inherit and evolve the established blue/gold brand from alexmercedcoder.dev:

```css
:root {
  --primary: #748ec3;        /* Professional Blue */
  --secondary: #c3a974;      /* Muted Gold */
  --accent: #3f5b92;         /* Deep Navy */
  --background: #ffffff;
  --surface: #f1f2f4;
  --text: #0a0a0a;
  --text-muted: #555555;
  --border: #e0e0e0;
  --shadow: rgba(0,0,0,0.1);
  --gradient-pro: linear-gradient(135deg, #3f5b92, #748ec3);
  --gradient-personal: linear-gradient(135deg, #c3a974, #e8d5a8);
}

[data-theme="dark"] {
  --background: #0f0f13;
  --surface: #1a1a24;
  --text: #f0f0f0;
  --text-muted: #b0b0b0;
  --border: #2a2a3a;
  --shadow: rgba(0,0,0,0.5);
}
```

### 4.2 Typography
- **Headings:** "Oswald", sans-serif (Google Fonts — 300, 400, 600)
- **Body:** "Inter", sans-serif (Google Fonts — 400, 500, 600) — *upgraded from Slabo for better screen readability*
- **Monospace (code/badges):** "JetBrains Mono", monospace

### 4.3 Visual Design Language
- **Glassmorphism cards** with backdrop-filter blur for section cards
- **Subtle gradient borders** to differentiate Professional (blue gradient) vs Personal (gold gradient) sections
- **Scroll-reveal animations** using IntersectionObserver (fade-in + slide-up)
- **Hover micro-animations** on cards, buttons, and links (scale, glow, lift)
- **Dark mode** with system-preference detection + manual toggle (localStorage persistence)
- **AM Monogram SVG** favicon (existing brand asset)

### 4.4 Section Visual Differentiation
- **Professional sections:** Blue/navy gradient accents, tech-forward aesthetic
- **Personal sections:** Gold/warm gradient accents, creative/organic aesthetic
- **Transition zone:** A visual divider between the two worlds with a brief philosophy statement

---

## 5. Technical Requirements

### 5.1 Tech Stack
- **Build Tool:** Vite
- **Language:** Vanilla JavaScript (ES6+)
- **Styling:** Vanilla CSS with CSS Custom Properties (no Sass — keep it simpler for a single-page site)
- **Deployment:** Static site (`vite build` → `dist/`)

### 5.2 Responsiveness
- Mobile-first CSS with breakpoints at 480px, 768px, 1024px, 1280px
- Navigation collapses to hamburger menu on mobile
- Book carousels become vertical stacks on narrow screens
- Touch-friendly tap targets (min 44px)

### 5.3 Performance
- Target Lighthouse score: 95+ across all categories
- Lazy-load images below the fold
- Preconnect to Google Fonts and external CDNs
- No framework runtime — pure vanilla JS (<5KB gzipped)
- Critical CSS inlined for above-the-fold content

---

## 6. SEO & Discoverability

### 6.1 Meta Tags
```html
<title>Alex Merced — Data Lakehouse & AI Expert | Author | Creator</title>
<meta name="description" content="The official portal of Alex Merced. Data Lakehouse expert, Apache Iceberg authority, O'Reilly & Manning author, Head of DevRel at Dremio, musician, and author of 35+ books.">
<meta name="keywords" content="Alex Merced, Data Lakehouse, Apache Iceberg, Apache Polaris, AI, Dremio, Developer Relations, DevRel, Author, Open Source">
<link rel="canonical" href="https://alexmerced.com">
```

### 6.2 Open Graph & Twitter Cards
```html
<meta property="og:title" content="Alex Merced — Data Lakehouse & AI Expert">
<meta property="og:description" content="Portal into the professional and personal world of Alex Merced.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://alexmerced.com">
<meta property="og:image" content="https://alexmerced.com/og-image.png">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@amdatalakehouse">
<meta name="twitter:creator" content="@amdatalakehouse">
```

### 6.3 JSON-LD Structured Data (Person Schema)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alex Merced",
  "jobTitle": "Head of Developer Relations",
  "worksFor": {
    "@type": "Organization",
    "name": "Dremio",
    "url": "https://www.dremio.com"
  },
  "url": "https://alexmerced.com",
  "image": "https://alexmerced.com/headshot.jpg",
  "description": "Data Lakehouse & AI expert, O'Reilly and Manning author, Head of Developer Relations at Dremio",
  "knowsAbout": [
    "Apache Iceberg", "Apache Polaris", "Data Lakehouse",
    "Agentic AI", "Developer Relations", "Python", "Rust", "JavaScript"
  ],
  "sameAs": [
    "https://github.com/alexmercedcoder",
    "https://www.linkedin.com/in/alexmerced",
    "https://bsky.app/profile/alextalksdatalakehouses.fyi",
    "https://www.youtube.com/@alexmerceddata",
    "https://www.youtube.com/@alexmercedcoder",
    "https://twitter.com/amdatalakehouse",
    "https://alexmerced.blog",
    "https://alexmercedcoder.dev"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "Bowling Green State University"
  },
  "award": "2025 Dremio CEO Award"
}
```

### 6.4 Technical SEO Files

#### `robots.txt`
```
User-agent: *
Allow: /

Sitemap: https://alexmerced.com/sitemap.xml
```

#### `sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://alexmerced.com/</loc>
    <lastmod>2026-05-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

#### `llms.txt` (AI/LLM Discoverability)
```
# Alex Merced

## About
Alex Merced is the Head of Developer Relations at Dremio and a leading expert in Data Lakehouse architecture, Apache Iceberg, and AI. He is an O'Reilly and Manning author with 35+ published books spanning technology, economics, philosophy, and fiction.

## Professional Links
- Blog: https://alexmerced.blog
- Portfolio: https://alexmercedcoder.dev
- Data Lakehouse Hub: https://datalakehousehub.com
- Books: https://books.alexmerced.com
- GitHub: https://github.com/alexmercedcoder

## Key Topics
- Apache Iceberg and Apache Polaris
- Data Lakehouse Architecture
- Agentic AI and AI Engineering
- Developer Relations and Developer Advocacy
- Open Source Data Infrastructure

## Social
- LinkedIn: https://www.linkedin.com/in/alexmerced
- YouTube (Data): https://www.youtube.com/@alexmerceddata
- YouTube (Dev): https://www.youtube.com/@alexmercedcoder
- BlueSky: https://bsky.app/profile/alextalksdatalakehouses.fyi
```

### 6.5 Identity Verification
All outbound social links include `rel="me"` attributes for cross-platform identity verification (Mastodon, BlueSky).

---

## 7. Accessibility & Progressive Enhancement

- Semantic HTML5 elements throughout (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Single `<h1>` per page with proper heading hierarchy
- All interactive elements have unique, descriptive `id` attributes
- ARIA labels on icon-only links and buttons
- Skip-to-content link for keyboard navigation
- Color contrast ratios meeting WCAG 2.1 AA
- PWA manifest for "Add to Home Screen" on mobile

---

## 8. Content Sections — Detailed Specifications

### 8.1 Navigation Bar
- Fixed/sticky at top with blur backdrop
- Logo: "AM" monogram + "Alex Merced" text
- Links: Home, Professional, Personal, About
- Dark mode toggle (sun/moon icon)
- Hamburger menu on mobile (< 768px)

### 8.2 Hero Section
- Full viewport height with subtle animated gradient background
- Professional headshot (circular, bordered)
- Name, title, tagline
- Two CTA buttons with distinct styling for Professional (blue) and Personal (gold)
- Social icon bar (GitHub, LinkedIn, YouTube, BlueSky, Twitter)

### 8.3 Professional Section
- **Expertise cards** — Grid of specialization areas with icons
- **Book showcase** — Horizontal scroll carousel featuring flagship books with cover images, link to [books.alexmerced.com](https://books.alexmerced.com) for full catalog
- **Projects grid** — Cards for each open source project with descriptions and GitHub links
- **Content hub** — Links to blog, podcast (with Spotify embed/badge), YouTube channels, newsletters
- **Social proof** — Testimonials in a grid, conference logos/names, stats (34K+ LinkedIn followers, etc.)

### 8.4 Section Divider
- Visual gradient transition from blue to gold
- Quote: *"Technology empowers. Creativity liberates."*

### 8.5 Personal Section
- **Philosophy statement** about creativity and personal autonomy
- **Music hub** — Links to YouTube, SoundCloud, ReverbNation with embedded playlist previews
- **Opinion & Ideas** — Loveatarian Substack feature card, opinion podcast links, philosophy book cards
- **Fiction showcase** — Book cards for fiction titles, highlighting the fantasy trilogy
- **Personal podcasts** — Links to opinion and economics podcasts

### 8.6 About / Timeline
- Condensed visual timeline with milestone markers
- Key life stages: Early Life → Music → College → NYC/Finance → Public Service → Tech → DevRel
- Designed as a scrollable horizontal or vertical timeline with icons

### 8.7 Footer
- Full social links with `rel="me"` attributes
- Quick links to all major properties (alexmerced.blog, datalakehousehub.com, books.alexmerced.com, etc.)
- Copyright with auto-updating year
- "Buy Me a Coffee" link

---

## 9. File Structure

```
alexmercedcom/
├── index.html              # Main SPA
├── index.css               # Design system + all styles
├── main.js                 # Interactivity (scroll, theme, menu)
├── vite.config.js          # Vite configuration
├── package.json            # Dependencies
├── public/
│   ├── favicon.svg         # AM monogram
│   ├── og-image.png        # Social sharing image (1200x630)
│   ├── headshot.jpg        # Professional headshot
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── llms.txt
│   └── manifest.json       # PWA manifest
└── dist/                   # Built output
```

---

## 10. Success Criteria

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse SEO | 100 |
| Lighthouse Accessibility | 95+ |
| Mobile Responsive | All breakpoints verified |
| Dark Mode | System preference + toggle |
| JSON-LD Validation | Passes Google Rich Results Test |
| Load Time (3G) | < 3 seconds |
| Total JS Bundle | < 5KB gzipped |

---

## 11. Open Questions

1. **Headshot Asset:** Do you have a current professional headshot to use, or should we generate a placeholder? The existing sites reference one but I need the actual file.

2. **Book Cover Images:** Should we pull cover images from Amazon for the book showcases, or do you have local copies of the cover art?

3. **Domain Continuity:** After launch, will the old alexmerced.com/data, /web, /opinion, /music routes need redirects, or will those be handled at the DNS/hosting level?

4. **Packt Book ("Agentic Software Engineering"):** I see you're currently working on a Packt book. Should this be included in the professional books section, or will it be added later when published?

5. **GitHub API Integration:** The current alexmercedcoder.dev dynamically fetches GitHub stats (followers, repos). Should the new site include this, or use static numbers?
