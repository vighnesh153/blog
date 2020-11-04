import React from "react";
import { Link } from "gatsby";

import Layout from "../components/layout";
import SEO from "../components/seo";

import { slugify } from "../utils";
import constants from "../constants";

const TagsPage = ({ pageContext: { tags, tagsPostCount } }) => {
  return (
    <Layout pageHeading="Tags" displayWhiteBackground={true} displayRecentPostsInSidebar={true}>
      <SEO title="Tags" />
      <ul style={styles.tagsList}>
        { tags.map(tag => (
          <li key={tag}>
            <Link to={"/tags/" + slugify(tag)} style={styles.tagLink}>
              <button style={styles.tagButton}>{tag}</button>
              <span> x {tagsPostCount[tag]} posts</span>
            </Link>
          </li>
        )) }
      </ul>
    </Layout>
  );
};

export default TagsPage;

const styles = {
  tagsList: {
    margin: '20px 0',
    display: 'flex',
    gap: '20px',
    flexDirection: 'column',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyle: 'none',
  },
  tagButton: {
    padding: '7px 20px',
    cursor: 'pointer',
  },
  tagLink: {
    textDecoration: 'none',
    color: constants.theme.secondary,
  },
};
