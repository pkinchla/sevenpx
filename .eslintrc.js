module.exports = {
  extends: 'next/core-web-vitals',
  rules: {
    'arrow-parens': ['error', 'always'],
    quotes: ['error', 'single', { avoidEscape: true }],
    'comma-dangle': ['error', 'always-multiline'],
    semi: ['error', 'always'],
    'react/react-in-jsx-scope': 'off',
    indent: ['error', 2],
    'react/jsx-no-duplicate-props': [0, { ignoreCase: false }],
  },
};
