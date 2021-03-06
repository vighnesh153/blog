const constants = {
  theme: {
    primary: "#6FF8DA",
    secondary: "#0A192F",
    info: "#2582cd",
    post: {
      bgColor: "#fff",
      borderColor: "#ccc",
    },
  },
  bounds: {
    rootContainer: {
      maxWidth: "1200px",
      width: "80%",
    },
  },

  // If updated, also update the value of limit in graphql query
  // in pages/index and also in templates/tag-posts
  postsPerPage: 5,
};

module.exports = constants;
