# PixelDosa — Frontend Job System
## Portfolio Template

A dark, bold, design-engineer-level portfolio built with Next.js, Tailwind CSS, and Framer Motion.

Part of the **PixelDosa Frontend Job System** bundle.

---

## Stack

- **Next.js 15** — App Router
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — scroll-triggered animations

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Customization — One file only

Everything you need to change is in:

```
data/portfolio.ts
```

Edit your name, bio, skills, projects, and contact info here.
You do not need to touch any component files.

---

## Project Structure

```
pixeldosa-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css       ← design tokens
├── components/
│   ├── Nav.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Skills.tsx
│   ├── Projects.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
└── data/
    └── portfolio.ts      ← edit this only
```

---

## Deploy

```bash
npx vercel
```

---

Made with care by PixelDosa
