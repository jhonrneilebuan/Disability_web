/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        custom: 'rgba(50, 50, 93, 0.25) 0px 12px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
      },
      colors:{
        pastelBlueGray: '#CED7E4',
        lightGray: "#DEE1E4",
        LightColor: "#FFFFFF",
        buttonBlue: "#546CA1",
        darkLight: "#566E8D"
      },
      fontFamily: {
        jakarta: ["'Plus Jakarta Sans'", "sans-serif"], 
      },
    },
  },
  plugins: [],
}