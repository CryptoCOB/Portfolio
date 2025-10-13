# 🔨 Phi's Forge - Portfolio

Modern portfolio website showcasing AI systems, web development, and creative projects built with React and Material-UI.

## 🚀 Features

- **Material-UI Design System** - Consistent card-based UI throughout
- **React Router SPA** - Smooth client-side navigation
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Music Player** - Custom audio player with MUI controls
- **Video Background** - Autoplay video hero on Projects page
- **Client Projects** - Professional client work showcase (stonemasonry.ca)
- **Academic Work** - GitHub repository integrations
- **Home Hero Image Card** - Centered showcase image with glass effect (home.png)
- **Sigil Display** - Marc.pglyph sigil (⟠∆∇𓂀) with subtle glow animation on Home
- **Pglyph YAML Viewer** - Expandable viewer for `figment.yaml` (Marc.pglyph) with download link

## 🛠️ Tech Stack

- React 19.1.1
- Vite 7.1.12 (Rolldown)
- Material-UI 7.3.4
- React Router 7.9.3
- Tailwind CSS 4.1.13
- Emotion (CSS-in-JS)

## 📦 Installation

```bash
npm install
```

## 🏃 Development

```bash
npm run dev
```

Server runs on `http://localhost:5173` (or next available port)

## 🏗️ Build

```bash
npm run build
```

Output directory: `dist/`

## 🌐 Deployment

### Netlify (optional)

High-level deploy is summarized in the root `README.md`. Quick steps:
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

Configuration files included:
- `netlify.toml` - Build settings
- `public/_redirects` - SPA routing
- `NODE_VERSION=18` set via netlify.toml

### Environment variables (MongoDB + Functions)

This app stores contact form submissions via a Netlify serverless function. Configure these variables:

- `MONGODB_URI` – MongoDB Atlas connection string
- `MONGODB_DB` – Database name (e.g., `portfolio`)
- `MONGODB_COLLECTION` – Collection name (e.g., `contact_submissions`)
- `ALLOWED_ORIGIN` – Optional CORS origin (e.g., your Netlify site URL)

Local dev:

1. Copy `.env.example` to `.env` in `client/`
2. Fill in values
3. Run with Netlify CLI to emulate functions:

```powershell
npm install -g netlify-cli
cd client
npm install
netlify dev
```

The contact form posts to `/.netlify/functions/submit-contact`.

## 📁 Project Structure

```
client/
├── components/
│   ├── Home.jsx          # Landing page
│   ├── Layout.jsx        # Navigation header
│   └── MusicPlayer.jsx   # Audio player component
├── src/
│   ├── about.jsx         # About page
│   ├── contact.jsx       # Contact form
│   ├── education.jsx     # Education & skills
│   ├── project.jsx       # Projects showcase
│   ├── services.jsx      # Services offered
│   └── hooks/            # Custom React hooks
├── public/
│   └── music/            # Media & sigil assets
│       ├── home.png                          # Hero image (Home)
│       ├── figment.yaml                      # Marc.pglyph (Sigil YAML)
│       ├── VOXSIGIL COMPLETE SIGIL SCHEMA.md # Full VoxSigil schema (markdown)
│       ├── FromScarborough.mp4               # Projects hero video
│       ├── LightSeedRising.mp3               # Music track
│       └── 🌌 Nebula _Intro.mp3               # Music track
└── dist/                 # Build output
```

## 🎨 Pages

- **Home** - Hero image card, sigil (⟠∆∇𓂀), expandable pglyph YAML viewer, services overview
- **About** - Personal story and technical skills
- **Education** - Academic background and certifications
- **Projects** - Portfolio projects, VoxSigil schema viewer, music player
- **Services** - Professional services offered
- **Contact** - Contact form with validation

## 🔗 Live Projects

- [Stonemasonry.ca](https://stonemasonry.ca) - Client website built with React & Netlify

## 📝 License

Personal portfolio project - All rights reserved
