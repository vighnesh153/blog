import React from "react";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";

import constants from "../constants";

const SinglePost = ({ data }) => {
  const { html } = data["markdownRemark"];
  const post = data["markdownRemark"].frontmatter;
  return (
    <Layout pageHeading={post.title} displayWhiteBackground={true} displayRecentPostsInSidebar={true}>
      <SEO title={post.title} />
      <div style={styles.root}>
        <div style={styles.imageContainer}>
          <GatsbyImage fluid={post.image.childImageSharp.fluid} />
        </div>
        <div style={styles.date}>{post.date}</div>
        <div style={styles.markdownContent} dangerouslySetInnerHTML={{ __html: html }}/>
      </div>
    </Layout>
  );
};

export const postQuery = graphql`
  query blogPostBySlug($slug: String!) {
      markdownRemark(fields: { slug: { eq: $slug } }) {
          id
          html
          frontmatter {
              title
              date(formatString: "MMM Do YYYY @ H:M")
              tags
              image {
                  childImageSharp {
                      fluid(maxWidth: 700) {
                          ...GatsbyImageSharpFluid
                      }
                  }
              }
          }
      }
  }
`;

export default SinglePost;

const styles = {
  title: {
    marginBottom: '10px',
  },
  imageContainer: {
    margin: '0 0 20px',
  },
  date: {
    margin: '0 0 20px',
    color: constants.theme.info,
    textAlign: 'left',
  },
  markdownContent: {
    lineHeight: '20px',
  },
  root: {
    width: '90%',
    margin: '20px auto',
  },
};
