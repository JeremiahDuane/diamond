import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <main className="flex min-h-svh items-center justify-center bg-slate-50 px-6 py-16 text-slate-900">
      <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
        <p className="text-sm font-semibold tracking-widest text-indigo-600 uppercase">
          Diamond
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Ready to build.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-slate-600">
          React, TypeScript, and Tailwind CSS. Edit{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm text-slate-800">
            src/App.tsx
          </code>{' '}
          to get started.
        </p>
        <button
          type="button"
          onClick={() => setCount((value) => value + 1)}
          className="mt-8 cursor-pointer rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition-colors hover:bg-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
        >
          Count: {count}
        </button>
        <nav aria-label="Documentation" className="mt-8 flex flex-wrap gap-5 text-sm">
          {[
            ['React', 'https://react.dev/'],
            ['Tailwind CSS', 'https://tailwindcss.com/docs'],
            ['Vite', 'https://vite.dev/guide/'],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="rounded text-slate-600 underline underline-offset-4 hover:text-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
            >
              {label}
            </a>
          ))}
        </nav>
      </section>
    </main>
  )
}

export default App
