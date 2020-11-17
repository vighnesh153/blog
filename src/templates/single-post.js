import React from "react";
import { graphql } from "gatsby";
import GatsbyImage from "gatsby-image";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Icons, { IconType } from "../components/icons";

import { DiscussionEmbed } from "disqus-react";

import constants from "../constants";
import { slugify } from "../utils";

const SocialLink = ({ url, title }) => (
  <li>
    <a href={url} target="_blank" rel="noreferrer noopener nofollow">
      {title}
    </a>
  </li>
);

const SinglePost = ({ data }) => {
  const { html, id } = data["markdownRemark"];
  const post = data["markdownRemark"].frontmatter;

  const protocol = "https://";
  const baseURL = "blog.vighnesh153.com/posts/" + slugify(post.title);

  const disqusShortname = "blog-vighnesh153-com";
  const disqusConfig = {
    identifier: id,
    title: post.title,
    url: protocol + baseURL,
  };

  return (
    <Layout
      pageHeading={post.title}
      displayWhiteBackground={true}
      displayRecentPostsInSidebar={true}
    >
      <SEO title={post.title} description={post.description || html.toString().slice(0, 150)} />
      <div style={styles.root}>
        <div style={styles.imageContainer}>
          <GatsbyImage fluid={post.image.childImageSharp.fluid} />
        </div>
        <div style={styles.date}>{post.date}</div>
        <div
          style={styles.markdownContent}
          className="markdown-customization"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <div>
          <p style={{ textAlign: "center" }}>___</p>
          <br />
          <h2 style={{ textAlign: "center" }}>Share this post</h2>
          <div>
            <ul style={styles.socialLinks}>
              <SocialLink
                title={<Icons type={IconType.FACEBOOK} width="15px" />}
                url={
                  "https://facebook.com/sharer/sharer.php?u=" +
                  protocol +
                  baseURL
                }
              />
              <SocialLink
                title={<Icons type={IconType.TWITTER} />}
                url={
                  "https://twitter.com/share?url=" +
                  protocol +
                  baseURL +
                  "&text=" +
                  post.title +
                  "&via=blog.vighnesh153.com"
                }
              />
              <SocialLink
                title={<Icons type={IconType.LINKEDIN} />}
                url={
                  "https://www.linkedin.com/sharing/share-offsite/?url=" +
                  encodeURI(baseURL)
                }
              />
            </ul>

            <p style={{ textAlign: "center" }}>___</p>
            <br />
          </div>

          <DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
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
        description
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
    width: "90%",
    margin: "20px auto",
  },
  title: {
    marginBottom: "10px",
  },
  imageContainer: {
    margin: "0 0 20px",
  },
  date: {
    margin: "0 0 20px",
    color: constants.theme.info,
    textAlign: "left",
  },
  markdownContent: {
    marginBottom: "20px",
    lineHeight: "20px",
  },
  socialLinks: {
    margin: "15px 0",
    display: "flex",
    gap: "30px",
    alignItems: "center",
    justifyContent: "center",
    listStyle: "none",
  },
};
