module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    // Choose from universe/native, universe/node, universe/web
    // 'universe/native',
    // 'universe/web',
    'plugin:react/recommended',
    'google',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'max-len': ['error', {code: 120}],
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
  },
};
