import React from "react";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";

import Layout from "../components/layout";
import Sidebar from "../components/sidebar";
import SEO from "../components/seo";

import classes from "../page-styles/index.module.scss";
import constants from "../constants";

const SinglePost = ({ data }) => {
  const { html } = data["markdownRemark"];
  const post = data["markdownRemark"].frontmatter;
  return (
    <Layout>
      <SEO title={post.title} />
      <div style={styles.root}>
        <div style={styles.leftSideBar} className={classes.leftMain}>
          <div style={styles.leftSideBarContent}>
            <h2 style={styles.title}>{post.title}</h2>
            <div style={styles.imageContainer}>
              <GatsbyImage fluid={post.image.childImageSharp.fluid} />
            </div>
            <div style={styles.date}>{post.date}</div>
            <div style={styles.markdownContent} dangerouslySetInnerHTML={{ __html: html }}/>
          </div>
        </div>
        <div style={styles.rightSideBar} className={classes.sidebar}>
          <Sidebar showRecentPosts={true} />
        </div>
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
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: '10px',
  },
  imageContainer: {
    // width: '80%',
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
  leftSideBar: {
    backgroundColor: 'white'
  },
  leftSideBarContent: {
    width: '90%',
    margin: '20px auto',
  },
  rightSideBar: {
  },
};
