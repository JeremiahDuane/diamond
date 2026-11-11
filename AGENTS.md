# Repository instructions

## React and TypeScript (`src/`)

- Always use `useCallback` for callbacks and event handlers defined inside React components, with complete dependency arrays.

- Keep components focused; extract reusable forms and icons into separate components.
- Define icons in `src/components/icons/` and import them into components such as Button where used.
- Use standard Tailwind utility classes. Do not use arbitrary values such as `size-[1rem]` or `w-[320px]`.
- Use whole-number Tailwind values for padding, margin, gaps, sizing, and other spacing utilities. Do not use fractional spacing values such as `py-1.5`, `mb-2.5`, or `gap-1.5`.
- Combine class names with the shared `cx` function in `src/utils/cx.ts`; do not concatenate or interpolate class strings.
- Do not use ternaries with null or undefined branches. Use `&&` for conditional rendering and optional values instead.
- Keep accessible names for icon-only buttons using screen-reader text.

## SQL and database (`db/`)

- Keep database changes scoped to the requested work.
- Use parameterized queries for dynamic values.
- Follow existing schema and naming conventions.

## Server (`server/`)

- Validate external input at boundaries and keep credentials out of source code.
- Follow existing server conventions.

## Verification

- Run `npm run build` and `npm run lint` after React or TypeScript changes.
