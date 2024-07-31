const path = require("path");
require("dotenv").config({ path: ".env" });

module.exports = {
  webpack: {
    alias: {
      // Add the aliases for all the top-level folders in the `src/` folder.
      "@components": path.resolve(__dirname, "src/components/"),
      "@containers": path.resolve(__dirname, "src/containers/"),
      // "@models": path.resolve(__dirname, "src/models/"),
      // "@samples": path.resolve(__dirname, "src/samples/"),
      "@screens": path.resolve(__dirname, "src/screens/"),
      "@scripts": path.resolve(__dirname, "src/scripts/"),
      // "@store": path.resolve(__dirname, "src/store/"),
      "@theme": path.resolve(__dirname, "src/theme/"),
      "@utils": path.resolve(__dirname, "src/utils/"),
      // "@hooks": path.resolve(__dirname, "src/hooks/"),
    },
  },
  style: {
    sass: {
      loaderOptions: {
        sassOptions: {
          includePaths: [path.resolve(__dirname, "src")],
        },
        additionalData: process.env.PUBLIC_URL
          ? "$baseurl: " + process.env.PUBLIC_URL + ";"
          : '$baseurl: "";',
      },
    },
    postcss: {
      mode: "file",
    },
  },
};
