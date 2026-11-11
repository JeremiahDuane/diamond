# Diamond

A minimal React + TypeScript app built with Vite and Tailwind CSS.

## Getting started

Use Node.js 22.12+ or a newer version supported by Vite, with npm installed.

```sh
npm install
npm run dev
```

Open the local URL printed by Vite. Edit `src/App.tsx` to start building.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server with hot reload |
| `npm run build` | Type-check and build for production in `dist/` |
| `npm run lint` | Check source files with Oxlint |
| `npm run preview` | Serve the production build locally |

## Styling

Tailwind is configured through `@tailwindcss/vite` in `vite.config.ts` and
imported in `src/index.css`. Use utility classes directly in components. Add
shared styles and theme customization in `src/index.css`.

## Project structure

```text
src/
  App.tsx      Starter component
  index.css    Tailwind import and global styles
  main.tsx     React entry point
index.html     HTML entry point
vite.config.ts React and Tailwind plugins
```

Reference: [Vite](https://vite.dev/guide/),
[React](https://react.dev/), and
[Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite).
