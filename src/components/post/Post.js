import React from "react";
import { Link } from "gatsby";

import GatsbyImage from "gatsby-image";

import classes from "./Post.module.scss";

import constants from "../../constants";
import { slugify } from "../../utils";

function Post({ title, slug, date, fluid, tags }) {
  const path = "/posts/" + slug;
  return (
    <div className={classes.post} style={styles.post}>
      <div className={classes.postImage}>
        {fluid && <GatsbyImage fluid={fluid} />}
      </div>
      <div className={classes.postBody}>
        <div className={classes.postHeader}>
          <div>
            <div className={classes.postTitle} style={styles.postTitle}>
              <Link to={path}>{title}</Link>
            </div>
            <div className={classes.postSubtitle} style={styles.postDate}>
              <span className={classes.postTextInfo}>{date}</span>
            </div>
          </div>
          <div className={classes.postReadLink} style={styles.postReadLink}>
            <Link to={path}>Read</Link>
          </div>
        </div>
        <ul className={classes.postTags}>
          {tags.map(tag => (
            <li key={tag}>
              <Link
                to={`/tags/${slugify(tag)}`}
                style={{
                  color: constants.theme.primary,
                  backgroundColor: constants.theme.secondary,
                }}
              >
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

const styles = {
  post: {
    backgroundColor: constants.theme.post.bgColor,
    borderColor: constants.theme.post.borderColor,
  },
  postTitle: {
    color: constants.theme.secondary,
  },
  postDate: {
    color: constants.theme.info,
  },
  postReadLink: {
    color: constants.theme.info,
    borderColor: constants.theme.info,
  },
};

export default Post;
