const appJson = require("./app.json");

module.exports = ({ config }) => {
  const isDevelopment = process.env.EAS_BUILD_PROFILE === "development";

  return {
    ...config,
    ...appJson.expo,

    ios: {
      ...appJson.expo.ios,
      bundleIdentifier: "com.shintaro.todotown",
    },

    android: {
      ...appJson.expo.android,
      package: isDevelopment
        ? "com.shintaro.todotown.dev"
        : "com.shintaro.todotown",
    },
  };
};