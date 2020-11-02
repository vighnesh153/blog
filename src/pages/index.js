import React from "react";
import { graphql, StaticQuery } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Post from "../components/post";

const IndexPage = () => (
  <Layout pageHeading="Homepage" displayWhiteBackground={false} displayRecentPostsInSidebar={false}>
    <SEO title="Home" />
    <StaticQuery
      query={indexQuery}
      render={({ allMarkdownRemark: { edges } }) => {
        // `edges` will be an array of markdown posts
        // console.log(edges);
        return (
          edges.map(({ node }) => (
            <Post
              key={node.id}
              date={node.frontmatter.date}
              title={node.frontmatter.title}
              slug={node.fields.slug}
              tags={node.frontmatter.tags}
              fluid={node.frontmatter.image?.childImageSharp?.fluid}
            />
          ))
        );
      }}
    />
  </Layout>
);

export default IndexPage;

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "MMM Do YYYY @ H:M")
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
