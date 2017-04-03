module.exports = {
  "env": {
    "browser": true,
    "node": true,
    "es6": true,
  },
  "parserOptions": {
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "jsx": true
    },
  },
  "plugins": ["react"],
  "rules": {
    "indent": ["error", 2],
  }
};
