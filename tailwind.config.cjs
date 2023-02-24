module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./node_modules/@yext/search-ui-react/**/*.{js,ts,jsx,tsx}", // New
  ],
  theme: {
    container: {
      center: true,
    },
    colors: {
      'transparent': 'transparent',
      'white': '#ffffff',
      'black': '#000000',
      'Dark-red': '#02a6db',
      'gray': '#383838',
      'hover-btn': '#017195',
      'footer-bg': '#1e293e',
      'red': '#02a6db',
      'red-eb': '#02a6db',
      'light-red': '#9fe0f5',
      'gray-dark': '#111111',
      'gray-light': '#ececec',
      'button-light': '#F5F5F7',
      'border-light': '#B2B3B5',
      'seachbutton-bg':'#E8E8ED',
      'nav-link': '#747474',
      'nav-li-border': '#d7d7d7',
      'right-menu-b': '#ebebeb',
      'search-text': '#9c9c9c',
      'location-bg': '#f7f7f7',
      'home-icon-bg': '#E5E5E1',
      'address-bg': '#FBFBFD',
      'hours-bg': '#eeeeee',
      'light-grey': '#F8F8F8',
      'faq-border': '#cfcfcf',
      'text-light': '#3D3935',
      'cookies-link': '#d61a0c',
      'box-border': '#cccccc',
      'dark-gray': '#333333',
      'hover-border': '#d8d8d8',
    },

    fontFamily: {
      'main-font': ['"Helvetica_Neue", Georgia, Arial, sans-serif'],
      'second-main-font': ['"futura_ptdemi", Georgia, Arial, sans-serif'],
    },

    extend: {
      backgroundImage: {
        shapet: "url('images/shape-t.svg')",
        shapeb: "url('images/shape-b.svg')",
        dots: "url('images/dots.svg')",
        newslettter_bg: "url('images/newsletter-bg.png')",
        newslettter_bg_mob: "url('images/bg-mobile-newletter.avif')",
        plus_icon:"url('images/plus-sym.svg')",
        minus_icon:"url('images/minus-sym.svg')",

      },
    },
  },
  plugins: [],
};