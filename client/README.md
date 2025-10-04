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

### Netlify (Recommended)

See [NETLIFY_DEPLOY.md](./NETLIFY_DEPLOY.md) for detailed deployment instructions.

**Quick Deploy:**
1. Connect GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy!

Configuration files included:
- `netlify.toml` - Build settings
- `public/_redirects` - SPA routing

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
│   └── music/            # Audio/video files
└── dist/                 # Build output
```

## 🎨 Pages

- **Home** - Hero with services overview
- **About** - Personal story and technical skills
- **Education** - Academic background and certifications
- **Projects** - Portfolio projects with live demos
- **Services** - Professional services offered
- **Contact** - Contact form with validation

## 🔗 Live Projects

- [Stonemasonry.ca](https://stonemasonry.ca) - Client website built with React & Netlify

## 📝 License

Personal portfolio project - All rights reserved
