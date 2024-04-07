module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        root: ["./src"],
        extensions: [".ios.js", ".android.js", ".js", ".json"],
      },
    ],
    "react-native-reanimated/plugin",
    "@babel/plugin-proposal-async-generator-functions",
  ],
};
