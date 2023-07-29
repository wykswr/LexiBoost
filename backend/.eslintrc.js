module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: 'google',
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'new-cap': 'off',
    'indent': ['off', 2],
    'max-len': ['off', 120],
    'valid-jsdoc': 'off',
    'require-jsdoc': 0,
  },
};
