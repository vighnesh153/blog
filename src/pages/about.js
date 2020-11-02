import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

const AboutPage = () => (
  <Layout pageHeading="About me" displayWhiteBackground={true} displayRecentPostsInSidebar={true}>
    <SEO title="About" />
  </Layout>
);

export default AboutPage;
