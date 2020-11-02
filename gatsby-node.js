/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require("path");
const { slugify } = require("./src/utils");

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  // If a markdown file
  if (node.internal.type === "MarkdownRemark") {
    const slugFromTitle = slugify(node.frontmatter.title);
    createNodeField({
      node,
      name: "slug",
      value: slugFromTitle
    });
  }

};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;
  const singlePostTemplate = path.resolve("./src/templates/single-post.js");

  return graphql(`
      {
          allMarkdownRemark {
              edges {
                  node {
                      frontmatter {
                          tags
                      }
                      fields {
                          slug
                      }
                  }
              }
          }
      }
  `).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    const posts = result.data["allMarkdownRemark"].edges;

    posts.forEach(({ node }) => {
      console.log(`Create page for: ` + "/posts/" + node.fields.slug)

      createPage({
        path: "/posts/" + node.fields.slug,
        component: singlePostTemplate,
        context: {
          // passing slug as template props
          slug: node.fields.slug
        }
      });
    });

  });
};
