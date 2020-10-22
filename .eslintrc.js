module.exports = {
  'env': {
    'es2020': true,
    'node': true
  },
  'extends': [
    'eslint:recommended',
  ],
  'parserOptions': {
    'ecmaVersion': 11,
    'sourceType': 'module',
    'impliedStrict': true
  },
  'rules': {
    'eqeqeq': 2,
    'curly': 'error',
    'quotes': ['error', 'single'],
    'camelcase': 0,
    'indent': ['error', 2],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'init-declarations': ['error', 'never', { 'ignoreForLoopInit': true }],
    'block-spacing': 2,
    'no-lonely-if': 0,
    'no-nested-ternary': 0,
    'arrow-spacing': 2,
    'prefer-const': 2,
    'prefer-destructuring': ['error', {
      'array': true,
      'object': true
    }],
    'prefer-numeric-literals': 2,
    'require-await': 2,
    'dot-location': ['error', 'property']
  },
  'globals': {
    'Promise': 'off'
  }
};
