/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      fontSize: {
        x: ['0.625rem', '0.8125rem'],
        s: ['0.8125rem', '1.25rem'],
        l: ['0.938rem', '1.5rem'],
      },
      padding: {
        full: '100%',
        '1/2': '50%',
        '1/3': '33.333%',
        '2/3': '66.666%',
        '1/4': '25%',
        '3/4': '75%',
        '3/5': '60%',
        '4/5': '80%',
      },
      boxShadow: {
        full: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        top: '0 -1px 3px 0 rgba(0, 0, 0, 0.1), 0 -1px 2px -1px rgba(0, 0, 0, 0.1)',
        bottom:
          '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
      },
      height: {
        inherit: 'inherit',
      },
      width: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [],
};
