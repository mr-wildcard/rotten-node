import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/main.js',
  output: {
    file: 'lib/index.js',
    format: 'cjs',
    name: "rotten-node",
    exports: "named",
  },
  external: ['superagent', 'querystring'],
  plugins: [
    nodeResolve({ preferBuiltins: true }),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [["env", { "modules": false }]],
      plugins: ["external-helpers", "transform-object-rest-spread"]
    })
  ],
  watch: {
    include: 'src/**',
  }
}