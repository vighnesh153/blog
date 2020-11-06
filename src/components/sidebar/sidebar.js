import React from "react";

import { graphql, Link, StaticQuery } from "gatsby";
import GatsbyImage from "gatsby-image";

import classes from "./sidebar.module.scss";

import AdvertisementPlaceHolder from "../../images/320x200.png";

const Sidebar = ({ showRecentPosts }) => (
  <React.Fragment>
    <div className={classes.card}>
      <div className={classes.cardBody}>
        <div className={classes.cardTitle}>Advertisement</div>
        <div className={classes.cardImage}>
          <img src={AdvertisementPlaceHolder} alt="Advertisement" />
        </div>
      </div>
    </div>

    {showRecentPosts && (
      <div className={classes.card}>
        <div className={classes.cardBody}>
          <div className={classes.cardTitle}>Recent Posts</div>

          <StaticQuery
            query={sidebarRecentPosts}
            render={data =>
              data["allMarkdownRemark"].edges.map(({ node }) => (
                <div
                  className={[classes.card, classes.postCard].join(" ")}
                  key={node.id}
                >
                  <GatsbyImage
                    fluid={node.frontmatter.image.childImageSharp.fluid}
                  />
                  <div className={classes.cardTitle}>
                    <Link to={"/posts/" + node.fields.slug}>
                      {node.frontmatter.title}
                    </Link>
                  </div>
                </div>
              ))
            }
          />
        </div>
      </div>
    )}
  </React.Fragment>
);

export default Sidebar;

const sidebarRecentPosts = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      limit: 3
    ) {
      edges {
        node {
          id
          frontmatter {
            title
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
