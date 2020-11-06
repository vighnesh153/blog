import React from "react";

import { graphql } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/post";
import Pagination from "../components/pagination";

const PostList = props => {
  const posts = props.data["allMarkdownRemark"].edges;
  const { currentPage, numberOfPages } = props.pageContext;

  const pageHeader = `Page: ${currentPage}`;

  return (
    <Layout
      pageHeading={pageHeader}
      displayWhiteBackground={false}
      displayRecentPostsInSidebar={true}
    >
      <SEO title={pageHeader} />
      {posts.map(({ node }) => (
        <Post
          key={node.id}
          date={node.frontmatter.date}
          title={node.frontmatter.title}
          slug={node.fields.slug}
          tags={node.frontmatter.tags}
          fluid={node.frontmatter.image?.childImageSharp?.fluid}
        />
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={numberOfPages}
        rootPath="/"
      />
    </Layout>
  );
};

export default PostList;

export const postListQuery = graphql`
  query($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
