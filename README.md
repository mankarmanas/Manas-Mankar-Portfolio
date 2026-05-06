# Manas Mankar — Portfolio

> AI Engineer & Full-Stack Developer | RAG Models · LangChain · LLM Orchestration · MERN Stack

Live portfolio showcasing my work in AI engineering, full-stack development, and intelligent system design.

---

## 🚀 Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Framework** | Next.js 14 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Email** | EmailJS |
| **Deployment** | Vercel |

---

## ✨ Features

- **Interactive Hero** — Particle canvas, 3D photo card with mouse-tracking spotlight, floating skill badges, typewriter animation
- **Skills Section** — Per-card scroll-triggered proficiency bar animations with category-colored glow
- **Experience Timeline** — Alternating left/right timeline with slide-in animations
- **Projects Showcase** — 3D tilt cards, award badges, project stats, and live GitHub links
- **Education & Leadership** — Academic background, certifications, leadership roles, and volunteer experience
- **Contact Form** — Live form powered by EmailJS — messages delivered directly to inbox
- **Fully Responsive** — Optimized for desktop, tablet, and mobile (iPhone 16 Pro Max)
- **Dark Theme** — Deep black background with indigo/amber accent system

---

## 🗂️ Project Structure

```
src/
├── app/
│   ├── globals.css        # Design tokens, utility classes, animations
│   ├── layout.tsx         # Root layout & metadata
│   └── page.tsx           # Page assembly
├── components/
│   ├── Navbar.tsx         # Sticky nav with mobile hamburger menu
│   ├── Hero.tsx           # Particle canvas, 3D photo card, typewriter
│   ├── About.tsx          # Bio and highlight cards
│   ├── Skills.tsx         # Scroll-triggered proficiency bars
│   ├── Experience.tsx     # Alternating timeline layout
│   ├── Projects.tsx       # 3D tilt project cards with stats
│   ├── Education.tsx      # Education, certs, leadership, volunteer
│   ├── Contact.tsx        # EmailJS contact form
│   └── Footer.tsx         # Footer with social links
└── data/
    └── portfolio.ts       # All content in one place — easy to update
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/mankarmanas/Manas-Mankar-Portfolio.git

# Navigate into the project
cd Manas-Mankar-Portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## ✏️ Customization

All personal content lives in a single file:

```
src/data/portfolio.ts
```

Update your name, bio, skills, experience, projects, certifications, and social links there — the entire site reflects the changes automatically.

---

## 📬 Contact Form Setup

The contact form uses [EmailJS](https://emailjs.com). To configure your own:

1. Create a free EmailJS account
2. Set up a Gmail service and email template
3. Replace the Service ID, Template ID, and Public Key in `Contact.tsx`

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🔗 Connect

- **Portfolio** — [manas-mankar.vercel.app](https://manas-mankar.vercel.app)
- **LinkedIn** — [linkedin.com/in/manas-mankar](https://linkedin.com/in/manas-mankar)
- **GitHub** — [github.com/mankarmanas](https://github.com/mankarmanas)
- **Email** — manasmahendra5@gmail.com
