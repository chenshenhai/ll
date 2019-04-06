const path = require('path');
// const buble = require('rollup-plugin-buble'); 
// const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

module.exports = [
  {
    // input: resolveFile('node/index.ts'),
    input: resolveFile('node/index.ts'),
    output: {
      file: resolveFile('dist/index.js'),
      format: 'iife',
      name: 'LogoLess',
    }, 
    plugins: [
      typescript({lib: ["es5", "es6", "dom"], target: "es5"}),
      // babel({
      //   babelrc: false,
		  //   presets: [
      //     ['@babel/preset-env', { modules: false }]
      //   ],
      //   plugins: [
      //     ["@babel/plugin-transform-classes", {
      //       "loose": true
      //     }]
      //   ]
      // }),
    ],
  },
]