module.exports = {
  extends: ["airbnb", "airbnb-typescript"],
  parserOptions: {
    project: "./tsconfig.json"
  },
  plugins: [
    'react',
    'react-hooks',
  ],
  rules: {
    'object-curly-newline': ['error', {multiline: true, consistent: true}],
    'import/prefer-default-export': 0,
    'no-console': 0,
    'arrow-body-style': 0,
    'react-hooks/exhaustive-deps': 'warn',
  },
  overrides: [
    {
      files: ['src/**/*.reducer.ts'],
      rules: { 'no-param-reassign': ['error', { props: false }] },
    },
  ],
};
