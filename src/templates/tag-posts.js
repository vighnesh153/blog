import React from "react";
import { graphql } from "gatsby";

import SEO from "../components/seo";
import Post from "../components/post";
import Layout from "../components/layout";
import Pagination from "../components/pagination";

import { slugify } from "../utils";
import constants from "../constants";

const TagPosts = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { totalCount } = data["allMarkdownRemark"];
  const pageHeader = `${totalCount} post(s) tagged with "${tag}"`;
  const { postsPerPage } = constants;

  const numberOfPages = Math.ceil(totalCount / postsPerPage)

  return (
    <Layout pageHeading={pageHeader} displayWhiteBackground={false} displayRecentPostsInSidebar={true}>
      <SEO title={tag} />
      {data["allMarkdownRemark"].edges.map(({ node }) => (
        <Post
          key={node.id}
          date={node.frontmatter.date}
          title={node.frontmatter.title}
          slug={node.fields.slug}
          tags={node.frontmatter.tags}
          fluid={node.frontmatter.image?.childImageSharp?.fluid}
        />
      ))}
      <Pagination currentPage={1} totalPages={numberOfPages} rootPath={"/tags/" + slugify(tag) + "/"} />
    </Layout>
  );
};

export default TagPosts;

export const tagQuery = graphql`
    query($tag: String!) {
        allMarkdownRemark (
            sort: { fields: [frontmatter___date], order: DESC},
            filter: { frontmatter: { tags: { in: [$tag] } } }
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
