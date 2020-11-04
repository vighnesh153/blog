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

  const templates = {
    singlePost: path.resolve("./src/templates/single-post.js"),
    tagsPage: path.resolve("./src/templates/tags-page.js"),
    tagPosts: path.resolve("./src/templates/tag-posts.js"),
  };

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
        component: templates.singlePost,
        context: {
          // passing slug as template props
          slug: node.fields.slug
        }
      });
    });

    // All tags
    const tags = [];
    posts.forEach(edge => {
      try {
        edge.node.frontmatter.tags.forEach(tag => tags.push(tag));
      } catch (e) {
        console.log("************");
        console.log("No tags for " + JSON.stringify(edge));
        console.log("************");
      }
    });

    // Counter of tags
    const tagsPostCount = {};
    tags.forEach(tag => {
      tagsPostCount[tag] = (tagsPostCount[tag] || 0) + 1;
    });

    const uniqueTags = Array.from(new Set(tags));

    createPage({
      path: "/tags",
      component: templates.tagsPage,
      context: {
        tags: uniqueTags,
        tagsPostCount,
      },
    });

    // create pages for each tags
    uniqueTags.forEach(tag => {
      createPage({
        path: "/tags/" + slugify(tag),
        component: templates.tagPosts,
        context: {
          tag,
        },
      });
    });
  });
};
