/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    // Styled entirely with inline styles, never Tailwind classes — and it has
    // to name CSS properties in prose and in code. Tailwind's extractor reads
    // this file as plain text, so a property name that happens to collide
    // with a utility (transition, container, grid, flex...) makes the JIT
    // emit that utility into globals.css, which is INLINED into every page.
    // One such collision cost 230B on every page load before this exclusion.
    '!./src/lib/internal-badge.ts',
    // The shared package's compiled JS — Tailwind's JIT has to see the class
    // names used inside <Button>, <Input>, <Turnstile>, <GoogleSignInButton>,
    // <AuthDivider> etc., or the shared auth UI ships unstyled.
    './node_modules/@ballisticbrands/frontend-shared/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', "'Segoe UI'", 'Roboto', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
    },
  },
  plugins: [],
};
