export const portfolio = {
  name: "Akshay Jayan",
  role: "Frontend Engineer | React | TypeScript | Design Systems",
  tagline: ["Turning", "ideas", "into products."],

  bio: [
    "Frontend Engineer with 3+ years building products, not just interfaces — scalable web and desktop applications that are clear, usable, and production-ready.",
    "I work across the boundary of design and development - building reusable component systems, improving UI consistency, and translating design into real products.",
    "Currently exploring design engineering while open to frontend roles and select freelance work.",
  ],

  location: "Kottayam, India | Remote",
  available: true,

  stats: [
    { value: "3+", label: "Years building" },
    { value: "5", label: "Projects delivered" },
    { value: "1", label: "Design system built" },
    { value: "40+", label: "Components authored" },
  ],

  experience: [
    {
      company: "ThinkPalm Technologies Pvt Ltd",
      location: "Kochi",
      role: "Senior Software Engineer",
      period: "January 2026 - Present",
      summary: "Scaling shared frontend systems for production applications across multiple modules and teams.",
      highlights: [
        "Designed and scaled a Storybook-driven shared component library with 40+ reusable components to improve UI consistency.",
        "Built React and TypeScript components for production applications, supporting scalable feature delivery across multiple modules.",
        "Contributed to micro-frontend architecture with shared UI components, design tokens, and frontend standards used across applications.",
        "Defined layout, spacing, responsiveness, and accessibility standards for polished production interfaces.",
        "Used Claude and Cursor to accelerate development, debugging, and frontend decision-making.",
      ],
      tags: ["React", "TypeScript", "Storybook", "Micro Frontends", "Design Tokens", "WCAG"],
    },
    {
      company: "ThinkPalm Technologies Pvt Ltd",
      location: "Kochi",
      role: "Software Engineer",
      period: "September 2022 - December 2025",
      summary: "Built web and desktop application interfaces with a focus on reusable architecture and complete interaction flows.",
      highlights: [
        "Built frontend architecture for Electron-based desktop applications, improving UI responsiveness, offline use, and maintainability.",
        "Translated Figma designs into scalable, WCAG-compliant, responsive frontend systems.",
        "Implemented reusable UI components and patterns to reduce duplication and improve maintainability.",
        "Designed user experiences around complete interaction flows, not just individual UI components.",
      ],
      tags: ["Electron", "React", "Figma", "Responsive UI", "State Management"],
    },
  ],

  skills: [
    {
      icon: "01",
      title: "Frontend Engineering",
      desc: "Building scalable, maintainable interfaces with modern React architecture and production-ready TypeScript.",
      tags: ["React", "TypeScript", "Next.js", "JavaScript ES6+", "Redux Toolkit", "REST APIs", "Electron"],
    },
    {
      icon: "02",
      title: "UI Engineering",
      desc: "Creating reusable systems that keep teams aligned across products, modules, and interaction states.",
      tags: ["Design Systems", "Storybook", "Component Libraries", "Micro Frontends", "Tailwind CSS", "SCSS"],
    },
    {
      icon: "03",
      title: "Accessibility & Quality",
      desc: "Turning layouts into responsive, clear, accessible interfaces with careful attention to standards and polish.",
      tags: ["WCAG", "Responsive Design", "Performance", "Maintainability", "Design Tokens"],
    },
    {
      icon: "04",
      title: "Design & Product",
      desc: "Bridging design intent and implementation through product thinking, UX judgment, and interaction detail.",
      tags: ["Figma", "Product Thinking", "UX Thinking", "Interaction Design"],
    },
    {
      icon: "05",
      title: "Motion & Experience",
      desc: "Creating smooth interactions and animations to enhance usability without adding noise.",
      tags: ["GSAP", "Framer Motion", "Three.js"],
    },
    {
      icon: "06",
      title: "Modern Workflows",
      desc: "Using AI-assisted workflows and modern tooling to iterate faster while keeping code reviewable.",
      tags: ["Claude", "Cursor", "Git", "Webpack", "Vite"],
    },
  ],

  projects: [
    {
      title: "Ship Management Suite - ThinkPalm",
      desc: "Worked on a production micro-frontend architecture, building shared UI components and a Storybook-driven design system used across multiple modules.",
      tags: ["React", "TypeScript", "Storybook", "Micro Frontend"],
      url: "#",
      overlayImage: "/project-ship-suite.svg",
      overlayAlt: "Abstract micro frontend ship management suite preview",
    },
    {
      title: "Shared Component Library - ThinkPalm",
      desc: "Designed and developed a reusable component library with 40+ components, improving UI consistency and speeding up development across teams.",
      tags: ["Storybook", "React", "Design Tokens", "TypeScript"],
      url: "#",
      overlayImage: "/project-component-library.svg",
      overlayAlt: "Abstract shared component library preview",
    },
    {
      title: "Hoot - Cross-Platform Music App",
      desc: "Built a downloadable desktop music player using React and Electron with offline playback, playlist management, and a custom theme system.",
      tags: ["React", "Electron", "TypeScript", "Music Player"],
      url: "#",
      overlayImage: "/project-hoot.svg",
      overlayAlt: "Hoot desktop music player interface preview",
      action: {
        label: "Download Hoot",
        href: "https://pixeldosa.gumroad.com/l/isjsu",
      },
    },
    {
      title: "Interior Design Studio Website",
      desc: "Designed and developed a modern website for an interior design firm, focusing on visual storytelling, layout clarity, and responsive experience.",
      tags: ["Next.js", "Framer", "UI Design"],
      url: "#",
      overlayImage: "/project-interior.svg",
      overlayAlt: "Interior design studio website preview",
    },
    {
      title: "Astrology Portfolio Website",
      desc: "Built a portfolio website for an astrology consultant with a strong focus on branding, clarity, and conversion-driven layout.",
      tags: ["Next.js", "UI/UX", "Responsive Design"],
      url: "#",
      overlayImage: "/project-astrology.svg",
      overlayAlt: "Astrology portfolio website preview",
    },
  ],

  contact: {
    email: "akshayjayan321@gmail.com",
    portfolio: "akshayjayan.com",
    linkedin: "linkedin.com/in/-akshay-jayan",
    github: "https://github.com/Akshay-Jayan3",
  },
};
