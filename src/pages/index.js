import React  from "react";
import { graphql, StaticQuery } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Post from "../components/post";
import Pagination from "../components/pagination";

import constants from "../constants";

const IndexPage = () => {
  const { postsPerPage } = constants;

  return (
    <Layout pageHeading="Homepage" displayWhiteBackground={false} displayRecentPostsInSidebar={false}>
      <SEO title="Home" />
      <StaticQuery
        query={indexQuery}
        render={({ allMarkdownRemark: { edges, totalCount } }) => {
          const numberOfPages = Math.ceil(totalCount / postsPerPage);
          return (
            <>
              {edges.map(({ node }) => (
                <Post
                  key={node.id}
                  date={node.frontmatter.date}
                  title={node.frontmatter.title}
                  slug={node.fields.slug}
                  tags={node.frontmatter.tags}
                  fluid={node.frontmatter.image?.childImageSharp?.fluid}
                />
              ))}
              <Pagination currentPage={1} totalPages={numberOfPages} rootPath="/" />
            </>
          );
        }}
      />
    </Layout>
  );
};

export default IndexPage;

const indexQuery = graphql`
  query {
    allMarkdownRemark(
        sort: { fields: [frontmatter___date], order: DESC }
        limit: 1
    ) {
      totalCount  
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
