/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        "zoom": "3px"
      },
      height: {
        "20": "70px"
      },
      backgroundImage: {
        // "bg-jumbo": "url('assets/images/bg-jumbo.jpg')"
         "bg-jumbo": "url('assets/images/open-shop-jumbo-bg-two.jpg')"
        //  "bg-jumbo": "url('assets/images/open-shop-jumbo-bg.jpg')"
      },
      backgroundSize: {
        "bg-size-full": "100% 100%"
      }
    },
  },
  plugins: [],
}
