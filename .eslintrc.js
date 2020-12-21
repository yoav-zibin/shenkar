// eslint-disable-next-line
module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
    jest: true,
  },
  extends: [
    'plugin:jest/recommended',
    // https://github.com/expo/expo/tree/master/packages/eslint-config-universe
    // Choose from universe/native, universe/node, universe/web
    // 'universe/native',
    // 'universe/web',
    'eslint:recommended',
    'plugin:react/recommended',
    'google',
    'plugin:@typescript-eslint/recommended',
    // Must be last so it gets the chance to override other configs.
    // see https://github.com/prettier/eslint-config-prettier
    'prettier',
    'prettier/@typescript-eslint',
  ],
  // See https://github.com/yannickcr/eslint-plugin-react#configuration
  settings: {
    react: {
      createClass: 'createReactClass', // Regex for Component Factory to use,
      // default to "createReactClass"
      pragma: 'React', // Pragma to use, default to "React"
      fragment: 'Fragment', // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: 'detect', // React version. "detect" automatically picks the version you have installed.
      // You can also use `16.0`, `16.3`, etc, if you want to override the detected value.
      // default to latest and warns if missing
      // It will default to "detect" in the future
      flowVersion: '0.53', // Flow version
    },
    propWrapperFunctions: [
      // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`.
      // If this isn't set, any propTypes wrapped in a function will be skipped.
      'forbidExtraProps',
      {property: 'freeze', object: 'Object'},
      {property: 'myFavoriteWrapper'},
    ],
    linkComponents: [
      // Components used as alternatives to <a> for linking, eg. <Link to={ url } />
      'Hyperlink',
      {name: 'Link', linkAttribute: 'to'},
    ],
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['jest', 'react', '@typescript-eslint'],
  rules: {
    // We have unit tests that call helper methods that call expect,
    // so this rule flags such unit tests as violations.
    'jest/expect-expect': 'off',
    // I don't like adding return types to only public functions.
    // (We don't write a library, so it's not critical for us to have explicit return types)
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'max-len': ['error', {code: 120}],
    'valid-jsdoc': 'off',
    'require-jsdoc': 'off',
    // I don't want to have any warnings (our CI catches only errors).
    // To see the current config, and make sure we don't have any warnings,
    // run:
    // ./node_modules/eslint/bin/eslint.js --print-config tictactoe/components/Game.tsx
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'jest/no-disabled-tests': 'error',
    'jest/no-commented-out-tests': 'error',
  },
};
