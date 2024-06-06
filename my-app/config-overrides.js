const path = require('path');
const { override, addWebpackAlias } = require('customize-cra');

module.exports = override(
  addWebpackAlias({
    '@Components': path.resolve(__dirname, 'src/Components'),
    '@Pages': path.resolve(__dirname, 'src/Pages')
  })
);
