module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  env: {
    browser: true,
    node: true,
    jest: true,
    es6: true
  },
  globals: {
    memoryDB: true,
    google: true
  },
  plugins: [
    'react',
    'jsx-a11y',
    'import',
    'eslint-plugin-prettier',
    'eslint-plugin-react'
  ],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  rules: {
    camelcase: 0,
    'no-restricted-syntax': 0,
    'no-plusplus': 0,
    'no-sequences': 0,
    'no-return-assign': 0,
    'global-require': 0,
    'import/no-extraneous-dependencies': 0,
    'import/no-named-as-default': 0,
    'no-await-in-loop': 0,
    'no-shadow': 0,
    'import/prefer-default-export': 0,
    'jsx-a11y/href-no-hash': 'off',
    'jsx-a11y/anchor-is-valid': ['warn', { aspects: ['invalidHref'] }],
    'prettier/prettier': ['error', { singleQuote: true }],
    'react/state-in-constructor': 0,
    'react/static-property-placement': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prefer-stateless-function': 0,
    'no-empty-pattern': 0,
    'react/no-array-index-key': 0,
    'no-underscore-dangle': 0,
    quotes: [2, 'single', { avoidEscape: true }],
    'max-len': [
      'error',
      {
        code: 100,
        tabWidth: 2,
        ignoreStrings: true,
        ignoreTemplateLiterals: true
      }
    ],
    'no-console': 0,
    'no-bitwise': 0,
    'react/jsx-filename-extension': [
      1,
      {
        extensions: ['.js']
      }
    ]
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['app']
      }
    }
  }
};
