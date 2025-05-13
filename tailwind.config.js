/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  safelist: ["bg-primary", "bg-secondary", "text-primary", "text-secondary"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary))",
        "primary-light": "rgba(var(--primary), 0.1)",
        secondary: "rgb(var(--secondary))",
        "secondary-light": "rgba(var(--secondary), 0.1)",
        background: "rgb(var(--background))",
        "text-light": "rgb(var(--text-light))",
        "text-dark": "rgb(var(--text-dark))",
      },
      animation: {
        "spin-slow": "spin 8s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-delay": "float 6s ease-in-out infinite 2s",
        "float-delay-2": "float 6s ease-in-out infinite 4s",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
