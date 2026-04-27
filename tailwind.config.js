/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        tertiary: '#334155',
        accent: '#38bdf8',
        'accent-dark': '#0284c7',
        'em-reparo': '#3b82f6',
        'em-reparo-bg': '#1e3a5f',
        atrasado: '#ef4444',
        'atrasado-bg': '#450a0a',
        finalizado: '#10b981',
        'finalizado-bg': '#022c22',
        associado: '#a78bfa',
        'associado-bg': '#2e1065',
        terceiro: '#fb923c',
        'terceiro-bg': '#431407',
      }
    }
  },
  plugins: []
}
