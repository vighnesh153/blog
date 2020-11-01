import React from "react";

import classes from "./footer.module.scss";

const Footer = () => {
  return (
    <footer className={classes.footer}>
      © {new Date().getFullYear()}, Built by
      {` `}
      <a href="https://vighnesh153.com" target="_blank" rel="noreferrer">
        Vighnesh Raut
      </a>
    </footer>
  );
};

export default Footer;
