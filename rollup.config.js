const babel = require('rollup-plugin-babel');

export default {
  entry: 'src/main.js',
  dest: 'lib/index.js',
  plugins: [ babel() ],
  format: 'umd'
};
