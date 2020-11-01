import React from "react";
import { graphql, StaticQuery } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import Post from "../components/post";
import Sidebar from "../components/sidebar";

import classes from '../page-styles/index.module.scss';

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <div style={styles.root}>
      <StaticQuery
        query={indexQuery}
        render={({ allMarkdownRemark: { edges } }) => {
          // `edges` will be an array of markdown posts
          // console.log(edges);
          return (
            <div style={styles.leftSideBar} className={classes.leftMain}>
              {edges.map(({ node }) => (
                <Post
                  key={node.id}
                  date={node.frontmatter.date}
                  title={node.frontmatter.title}
                  path={node.frontmatter.path}
                  tags={node.frontmatter.tags}
                  fluid={node.frontmatter.image?.childImageSharp?.fluid}
                />
              ))}
            </div>
          );
        }}
      />
      <div style={styles.rightSideBar} className={classes.sidebar}>
        <Sidebar showRecentPosts={false} />
      </div>
    </div>
  </Layout>
);

export default IndexPage;

const indexQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          frontmatter {
            title
            date(formatString: "MMM Do YYYY @ H:M")
            path
            tags
            image {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
          id
          html
        }
      }
    }
  }
`;

const styles = {
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leftSideBar: {
  },
  rightSideBar: {
  },
};
