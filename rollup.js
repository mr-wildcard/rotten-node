import { rollup } from 'rollup';
import babel from 'rollup-plugin-babel';

rollup({
  entry: 'src/main.js',
  dest: 'lib/index.js',
  plugins: [ babel({
    babelrc: false,
    runtimeHelpers: true,
    presets: [
      "stage-0",
      "es2015-rollup"
    ]
  }) ],
  format: 'umd'
})
.then(console.log('Sources bundled !'));
