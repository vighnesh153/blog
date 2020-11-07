/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../header";
import Sidebar from "../sidebar";
import Footer from "../footer";

import "./layout.scss";
import classes from "../../page-styles/index.module.scss";

import constants from "../../constants";

const Layout = ({
  children,
  pageHeading,
  displayWhiteBackground,
  displayRecentPostsInSidebar,
}) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <div style={{ height: "100%" }}>
      <Header siteTitle={data["site"].siteMetadata?.title || `Title`} />
      <div
        style={{
          margin: `0 auto`,
          width: constants.bounds.rootContainer.width,
          maxWidth: constants.bounds.rootContainer.maxWidth,
          // padding: `0 1.0875rem 1.45rem`,
          padding: `0 0 1.45rem`,
        }}
      >
        <div style={styles.root}>
          <div
            style={styles.leftSideBar(displayWhiteBackground)}
            className={classes.leftMain}
          >
            <h1 style={styles.siteHeading}>{pageHeading}</h1>
            <main>{children}</main>
          </div>
          <div style={styles.rightSideBar} className={classes.sidebar}>
            <Sidebar showRecentPosts={displayRecentPostsInSidebar} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

const styles = {
  root: {
    position: "relative",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  siteHeading: {
    margin: "0 0 10px",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "white",
    textDecoration: "underline",
  },
  leftSideBar: displayWhiteBackground => ({
    backgroundColor: displayWhiteBackground ? "white" : "transparent",
  }),
  rightSideBar: {},
};
