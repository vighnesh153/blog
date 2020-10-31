import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import constants from "../../constants";

import classes from './header.module.scss';

const HeaderLink = ({ to, text }) => (
  <Link
    to={to}
    style={{
      color: constants.theme.primary,
      textDecoration: `none`,
    }}
  >
    {text}
  </Link>
);

const Header = ({ siteTitle }) => (
  <header
    className={classes.header}
    style={{
      background: constants.theme.secondary,
    }}
  >
    <div
      className={classes.headerContainer}
      style={{
        width: constants.bounds.rootContainer.width,
        maxWidth: constants.bounds.rootContainer.maxWidth,
      }}
    >
      <h1 className={classes.headerTitle}>
        <HeaderLink to="/" text={siteTitle} />
      </h1>

      <span className={classes.headerExtraNavLinks}>
        <HeaderLink to="/tags" text="Tags" />
        <HeaderLink to="/about" text="About" />
      </span>
    </div>
  </header>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: `Blog`,
};

export default Header;
