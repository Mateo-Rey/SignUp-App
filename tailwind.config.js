module.exports = {
  content: ['./src/components/*.{html,jsx,js}', "./public/*.html"],
  theme: {
    colors: {
      'blue': '#4A6D7C',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'red': '#EF6461',
      'orange': '#ff7849',
      'green': '#3E885B',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
      'gray-blue': '#B7D1DA',
      'tapue-gray': '#7F7B82',
      'crimson-red': '#D81E5B',
      'max-yellow': '#F6F740',
      'dark-red': '#A61C3C',
      'sea-green': '#5299D3',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}