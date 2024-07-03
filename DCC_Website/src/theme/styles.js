export const globalStyles = {
  colors: {
    gray: {
      700: "#1f2733",
    },
    brand: {
      50: "#ffe5cc",
      100: "#ffb366",
      200: "#ff9933",
      300: "#ff8000",
      400: "#e67300",
      500: "#cc6600",
      600: "#b35900",
      700: "#994d00",
      800: "#804000",
      900: "#663300"
    },
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Plus Jakarta Display",
      },
      "*::placeholder": {
        color: "gray.400",
      },
      html: {
        fontFamily: "Plus Jakarta Display",
      },
    }),
  },
};
