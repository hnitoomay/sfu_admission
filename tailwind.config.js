import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "Pyidaungsu",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
    },
    fontWeight: {
      hairline: 100,
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
      black: 900,
    },
    extend: {
      screens: {
        sm: "320px",
        md: "768px",
        lg: "1024px",
        xl: "1440px",
        "2xl": "1536px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        transparent: "transparent",
        current: "currentColor",
        primary: "#D30000",
        black: {
          50: "#343330",
          100: "#000000",
        },
        white: {
          50: "#FAFAFA",
          100: "#FFFFFF",
          150: "#F4F4F4",
        },
        // blue: {
        //   50: "#60a5fa",
        //   100: "#007AFF",
        //   150: "#F4F8FB",
        //   200: "#025394",
        // },
        blue: {
          50: "#000000",
          100: "#000000",
          150: "#F4F8FB",
          200: "#000000",
        },
        gray: {
          50: "#E4E4E4",
          100: "#D1D3D9",
          150: "#E3ECF3",
          200: "#C0C0C0",
          300: "#B8B8B8",
          400: "#A9A9A9",
          500: "#808080",
          600: "#696969",
          700: "#3C3C3C",
          800: "#212121",
          850: "#898585",
          900: "#000000",
        },
        red: {
          50: "#DE0909",
          100: "#D30000",
        },
        green: "#38B551",
        border: {
          50: "#E4E4E4",
          100: "#E3ECF3",
        },
        warning: "#FFC000",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
