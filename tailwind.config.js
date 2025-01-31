/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'primary1' : '#731919',
      'primary2' : '#F5F5F5',
      'hover1' : '#B6ADAD',
      'hover2' : '#BD3D3D',
      'white' : '#ffffff',
      'blue' : '#0386FF',
      'hover3' : '#79BFFF',
      'green' : '#35AF39',
      'greenHover' : '#60CB64',
      'yellow' : '#F5DB15'
    }
  },
  plugins: [],
};
