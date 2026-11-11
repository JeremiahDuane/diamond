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
  components/  Reusable React components
  index.css    Tailwind import and global styles
  main.tsx     React entry point
index.html     HTML entry point
vite.config.ts React and Tailwind plugins
```

## Data table

`DataTable` accepts typed columns, a row key function, and a visible caption.
Enable sorting per column with `sortable`. Clicking a sortable heading cycles
through ascending, descending, and the original row order. Sorting leaves the
input data unchanged and keeps missing values last.

```tsx
import { DataTable } from './components/DataTable'
import type { DataTableColumn } from './components/DataTable'

type Person = { id: number; name: string; email: string; age: number }

const columns: DataTableColumn<Person>[] = [
  { id: 'name', header: 'Name', accessor: (row) => row.name, sortable: true },
  {
    id: 'email',
    header: 'Email',
    accessor: (row) => row.email,
    cell: (row) => <a href={`mailto:${row.email}`}>{row.email}</a>,
  },
  { id: 'age', header: 'Age', accessor: (row) => row.age, sortable: true, align: 'right' },
]

const people: Person[] = [
  { id: 1, name: 'Alex', email: 'alex@example.com', age: 32 },
]

export function PeopleTable() {
  return (
    <DataTable
      caption="People"
      data={people}
      columns={columns}
      getRowKey={(row) => row.id}
      emptyMessage="No people to display."
    />
  )
}
```

Use unique column IDs and stable row keys. Accessors provide primitive values
for display and sorting; optional `cell` functions customize the rendered content.
The table scrolls horizontally on narrow screens and supports light and dark themes.

Reference: [Vite](https://vite.dev/guide/),
[React](https://react.dev/), and
[Tailwind CSS](https://tailwindcss.com/docs/installation/using-vite).
