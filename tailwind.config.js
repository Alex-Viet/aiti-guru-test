/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#242EDB",
          hover: "#3451D1",
          50: "#EEF1FD",
        },
        secondary: {
          DEFAULT: "#3c538e",
        },
        danger: "#FA5252",
        surface: "#FFFFFF",
        muted: "#e0e0e0",
        border: "#EDEDED",
        page: "#F6F6F6",
        login: "#474747",
        "table-row-active": "#F0F3FF",
        table: {
          border: "#E2E2E2",
          heading: "#B2B4BD",
          text: "#495057",
          title: "#2D2F35",
          hover: "#FAFAFA",
          surface: "#F1F3F5",
          icon: "#A8ADB9",
          checkbox: "#B2B3B9",
          skeleton: "#E9ECEF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        cairo: ["Cairo", "sans-serif"],
        "open-sans": ["Open Sans", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 12px rgba(0,0,0,0.06)",
        "card-lg": "0 24px 32px 0 rgba(0, 0, 0, 0.04)",
      },
      borderRadius: {
        card: "12px",
      },
      keyframes: {
        loading: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(400%)" },
        },
      },
      animation: {
        loading: "loading 1.2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
