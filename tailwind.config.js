/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#190D15',
        wine: '#4B182B',
        rose: '#D9A1A9',
        ivory: '#F5EBDD',
        gold: '#D6B47A',
        'pink-bright': '#FF69B4',
        'pink-vibrant': '#FF1493',
        'pink-hot': '#FF6B9D',
        'pink-neon': '#FF007F',
        'pink-coral': '#FF7F9D',
        'pink-sunset': '#FF6FA6',
        'pink-luminous': '#FF69B4',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 24px -4px rgba(214,180,122,0.35)',
        'glow-lg': '0 0 44px -2px rgba(214,180,122,0.5)',
      },
    },
  },
  plugins: [],
}
