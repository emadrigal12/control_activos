const Card = {
  baseStyle: {
    p: "22px",
    display: "flex",
    flexDirection: "column",
    backdropFilter: "blur(120px)",
    width: "100%",
    borderRadius: "20px",
    bg:
      "linear-gradient(90deg, rgba(46,46,46,0.8) 42%, rgba(47,47,47,0.8) 71%)",
    backgroundClip: "border-box",
  },
};

export const CardComponent = {
  components: {
    Card,
  },
};
