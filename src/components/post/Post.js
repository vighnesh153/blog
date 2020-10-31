import React from "react";
import { Link } from "gatsby";

import GatsbyImage from "gatsby-image";

import classes from "./Post.module.scss";
import constants from "../../constants";

function Post({ title, path, date, fluid }) {
  path = "/posts" + path;
  return (
    <div className={classes.post} style={styles.post}>
      <div className={classes.postImage}>
        { fluid && <GatsbyImage fluid={fluid} /> }
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
