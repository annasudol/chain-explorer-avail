/* eslint-disable import/no-extraneous-dependencies */
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
  eslint: {
    dirs: ["."],
  },
  poweredByHeader: false,
  trailingSlash: true,
  basePath: "",
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  crossOrigin: "use-credentials",
  // Note: compiler options will be ignored when using Babel (.babelrc)
  compiler: {
    styledComponents: true,
    // Configure styled-jsx to use PostCSS
    emotion: false,
  }
});

// crossOrigin: 'anonymous',
