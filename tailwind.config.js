module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      colors: {
        "app-gradient-start": "#00D9FF",
        "app-gradient-end": "#0086D9",
        "chart-bg": "#E9FBFF",
      },
      spacing: {
        4.5: "1.125rem",
        13: "3.25rem",
        18: "4.5rem",
      },
      fontSize: {
        "temp-large": "2.5rem",
        "temp-small": "1.75rem",
      },
      borderRadius: {
        card: "1.25rem",
        input: "0.75rem",
      },
      boxShadow: {
        card: "0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)",
        input: "0 2px 4px rgba(0, 0, 0, 0.05)",
      },
      backdropBlur: {
        card: "8px",
      },
      animation: {
        "fade-in": "fadeIn 1s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
