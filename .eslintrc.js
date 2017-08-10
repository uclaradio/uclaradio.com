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
  "plugins": ["react", "prettier"],
  "rules": {
    "indent": ["error", 2],
    "eol-last": ["error", "always"],
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "es5",
      "jsxBracketSameLine": true,
    }],
}]
  }
};
