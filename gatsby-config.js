module.exports = {
  siteMetadata: {
    title: `Vighnesh Raut's Blog`,
    description: `Hello everyone. I am Vighnesh Raut. Welcome to my personal blog. I hope you like my content.`,
    author: `Vighnesh Raut`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        // CommonMark mode (default: true)
        commonmark: true,
        // Footnotes mode (default: true)
        footnotes: true,
        // Pedantic mode (default: true)
        pedantic: true,
        // GitHub Flavored Markdown mode (default: true)
        gfm: true,
        // Plugins configs
        plugins: [
          `gatsby-remark-mathjax`,            // Math support
          `gatsby-remark-autolink-headers`,   // Links to headers (automatically)
          `gatsby-remark-prismjs`,            // Colored code in code-block
          `gatsby-remark-copy-linked-files`,  // Copies files to respective folders
          `gatsby-remark-images`,             // blur-to-focus effect in images in markdown
          `gatsby-remark-external-links`,     // adds target="_blank" and rel="..." to links
        ],
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
