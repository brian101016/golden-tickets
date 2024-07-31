/** @type {import('postcss-load-config').Config} */
module.exports = {
  plugins: [
    require("cssnano"),
    require("colorguard"),
    require("rucksack-css"),
    require("postcss-preset-env")({
      autoprefixer: {
        flexbox: "no-2009",
      },
      stage: 2,
      features: {
        "nesting-rules": true,
      },
    }),
  ],
};
