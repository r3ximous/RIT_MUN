# RIT MUN Official Website

Welcome to the RIT Model United Nations (MUN) Official Website repository! This project is built using [Astro](https://astro.build), [React](https://react.dev/), and [Tailwind CSS](https://tailwindcss.com/).

## 🚀 Tech Stack

- **Framework:** [Astro](https://astro.build)
- **UI Components:** [React](https://react.dev/)
- **Styling:** [Tailwind CSS (v4)](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Content:** Astro Content Collections (Markdown/JSON)

## 📋 Prerequisites

Make sure you have the following installed before contributing:
- [Node.js](https://nodejs.org/en/) (>= **v22.12.0** as specified in package.json engines)
- A package manager (`npm`, `pnpm`, or `yarn`)

## 🛠️ Getting Started

1. **Clone the repository:**
   ```bash
   git clone <repo-url>
   cd RIT_MUN
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or pnpm install / yarn install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   The site will be available at `http://localhost:4321`.

## 📁 Project Structure

Here's an overview of the key directories you'll be working with:

```text
/
├── public/             # Static assets (images, fonts) served at the root path
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── astro/      # Astro-specific components (.astro)
│   │   └── react/      # React components (.tsx)
│   ├── content/        # Content collections (Markdown & JSON data)
│   │   ├── committees/ # Markdown files for each committee
│   │   ├── faqs/       # FAQ content
│   │   └── schedule/   # JSON files for the event schedule
│   ├── layouts/        # Shared page layouts
│   ├── pages/          # File-based routing (each .astro file is a route)
│   └── styles/         # Global stylesheets (Tailwind config)
├── astro.config.mjs    # Astro configuration file
├── package.json        # Dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## 🧞 Available Commands

All commands are run from the root of the project, from a terminal:

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts local dev server at `localhost:4321` |
| `npm run build` | Build your production site to `./dist/` |
| `npm run preview` | Preview your build locally, before deploying |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |

## 💡 Contribution Guidelines

1. **Components:** Prefer Astro components (`.astro`) for static UI. Use React components (`.tsx`) only when client-side interactivity is required (like the `CountdownTimer.tsx`).
2. **Content:** All content (committees, schedule) is managed via Astro Content Collections in `src/content/`. Update the respective Markdown or JSON files to change content.
3. **Styling:** Use Tailwind CSS utility classes for styling components. Global styles are managed in `src/styles/global.css`.

Happy coding! 🎉 
