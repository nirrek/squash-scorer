module.exports = {
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es6: true,
  },
  extends: 'airbnb-base',
  rules: {
    'func-names': 0,
    'no-use-before-define': 0,
  },
};
