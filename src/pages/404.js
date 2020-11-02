import React from "react";

import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

const NotFoundPage = () => (
  <Layout pageHeading="404: Not Found" displayWhiteBackground={true} displayRecentPostsInSidebar={true}>
    <SEO title="404: Not found" />
    <div style={styles.root}>
      <p>
        You just hit a route that doesn't exist... the sadness. {" "}
        <Link to={"/"}>Return Home</Link>
      </p>
    </div>
  </Layout>
);

export default NotFoundPage;

const styles = {
  root: {
    width: "90%",
    margin: "20px auto"
  }
};
