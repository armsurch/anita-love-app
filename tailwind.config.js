module.exports = {
  content: [
    "./Anita.html",
    "./Anita/**/*.{html,js}",
    "./anita.js"
  ],
  theme: {
    extend: {
      colors: {
        'babe-pink': '#ff69b4',
        'heart-red': '#e04b7b',
        'theme-pink-start': '#ffdde1',
        'theme-pink-end': '#ee9ca7',
        'theme-blue-start': '#c3e3ff',
        'theme-blue-end': '#a7b7ee',
        'theme-green-start': '#e6ffcc',
        'theme-green-end': '#c9e6a7',
      },
      animation: {
        'heartbeat': 'heartbeat 0.6s ease-in-out',
        'fadeIn': 'fadeIn 0.7s ease-out',
        'typewriter': 'typewriter 2s steps(20) forwards',
      },
      keyframes: {
        heartbeat: {
          '0%': { transform: 'rotate(-45deg) scale(1)' },
          '25%': { transform: 'rotate(-45deg) scale(1.1)' },
          '50%': { transform: 'rotate(-45deg) scale(1)' },
          '75%': { transform: 'rotate(-45deg) scale(1.05)' },
          '100%': { transform: 'rotate(-45deg) scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        }
      }
    },
  },
  plugins: [],
}
