module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        custom: ['Silka', 'sans-serif'],
      },
      colors: {
        primary: '#ffffff',
        secomdary: '#1A202F',
        error: '#E11900',
        success: '#5CB85C',
        warning: '#5F2C933',
        tertiary: '#0671E0',
        customWhite: '#F3F3F3',
        customgray: '#767982',
        notifications: '#F1F1F199',
      },
      fontSize: {
        header: '24px',
        large: '17px',
        medium: '14px',
        small: '12px',
      },
      borderRadius: {
        primary: '7px',
        secondary: '4px',
      },
    },
  },
  plugins: [],
};
