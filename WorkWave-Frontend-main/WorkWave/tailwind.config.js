module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          500: '#FFD700',
          600: '#FFC700',
        },
        blue: {
          900: '#003366',
        },
        white: '#FFFFFF',
      },
      backgroundColor: {
        'default': '#FFFFFF',  
      },
      backgroundImage: {
        'login-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.8), rgba(255,215,0,0.8))',
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
