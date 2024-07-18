module.exports = {
  secret:
    process.env.JWT_SECRET ||
    "ca5f4d955f847807459a22c02bdea2ed1287485efe460dbfe773097ded805b05",
  expiresIn: "8h",
};
