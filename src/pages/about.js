import React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";

import ProfilePicLink from "../images/icon.png";

const MyLink = ({ href, innerText }) => (
  <a target="_blank" href={href} rel="nofollow noreferrer noopener">
    {innerText}
  </a>
);

const AboutPage = () => (
  <Layout
    pageHeading="About me"
    displayWhiteBackground={true}
    displayRecentPostsInSidebar={true}
  >
    <SEO title="About" />
    <div style={styles.imageContainer}>
      <img
        style={styles.imageContainer.image}
        src={ProfilePicLink}
        alt="Profile"
      />
    </div>
    <div style={styles.text}>
      <p style={styles.bottomSpacer}>
        Hi Guys. I am <strong>Vighnesh Raut</strong>. I am a
        <strong>Computer Science graduate</strong> with a sweet tooth for
        <strong>Mathematics</strong>. I love to <strong>cook</strong>,
        <strong>solve Coding and Math contests</strong>,{" "}
        <strong>play Mobile games</strong>, and watch{" "}
        <strong>"The Big Bang Theory"</strong>.
      </p>
      <p style={styles.bottomSpacer}>
        For a long time, I wanted to create a blog site but couldn't do it. Now,
        I have finally got it out and I plan on posting content here very often.
        The content will mostly be based on <strong>Programming</strong>,
        <strong>Math</strong> and <strong>Technology in general</strong>. But, I
        am not limiting myself to these. I might even start posting
        food-recipes, philosophical articles or anything wild that comes to my
        mind which I find interesting.
      </p>
      <p style={styles.bottomSpacer}>
        I hope you like my content and any constructive criticism will be
        appreciated. If you want me to write a post on a specific topic, drop me
        a mail or message.
      </p>
    </div>

    <div style={styles.contactData}>
      <p style={styles.contactData.header}>Contact Links</p>
      <ul>
        <li>
          <MyLink href="https://vighnesh153.com" innerText="Website" />
        </li>
        <li>
          <MyLink href="https://github.com/vighnesh153" innerText="Github" />
        </li>
        <li>
          <MyLink
            href="https://www.linkedin.com/in/vighnesh153"
            innerText="LinkedIn"
          />
        </li>
        <li>
          {"Email - "}
          <MyLink
            href="mailto:vighnesh.raut13@gmail.com"
            innerText="vighnesh.raut13@gmail.com"
          />
        </li>
      </ul>
    </div>
  </Layout>
);

export default AboutPage;

const styles = {
  imageContainer: {
    margin: "20px",
    image: {
      display: "block",
      margin: "auto",
    },
  },
  text: {
    margin: "20px",
    fontSize: "20px",
  },
  bottomSpacer: {
    marginBottom: "20px",
  },
  contactData: {
    margin: "20px",
    header: {
      fontSize: "25px",
      fontWeight: "bold",
      textAlign: "center",
    },
  },
};
