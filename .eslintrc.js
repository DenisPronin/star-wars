module.exports = {
  extends: ["airbnb", "airbnb-typescript"],
  parserOptions: {
    project: "./tsconfig.json"
  },
  rules: {
    'object-curly-newline': ['error', {multiline: true, consistent: true}]
  }
};
