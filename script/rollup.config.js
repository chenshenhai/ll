const path = require('path');
// const babel = require('rollup-plugin-babel');
const typescript = require('rollup-plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const less = require('less');

const resolveFile = function(filePath) {
  return path.join(__dirname, '..', filePath)
}

const isProductionEnv = process.env.NODE_ENV === 'production';

const processLess = function(context, payload) {
  return new Promise(( resolve, reject ) => {
    less.render({
      file: context
    }, function(err, result) {
      if( !err ) {
        resolve(result);
      } else {
        reject(err);
      }
    });

    less.render(context, {})
    .then(function(output) {
      // output.css = string of css
      // output.map = string of sourcemap
      // output.imports = array of string filenames of the imports referenced
      if( output && output.css ) {
        resolve(output.css);
      } else {
        reject({})
      }
    },
    function(err) {
      reject(err)
    });

  })
}

module.exports = [
  {
    // input: resolveFile('node/index.ts'),
    input: resolveFile('node/index.ts'),
    output: {
      file: resolveFile('dist/index.js'),
      format: 'umd',
      name: 'Logox',
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
  {
    input: resolveFile('src/portal/page.ts'),
    output: {
      file: resolveFile('dist/portal/index.js'),
      format: 'iife',
    }, 
    plugins: [
      postcss({
        extract: true,
        minimize: isProductionEnv,
        process: processLess,
      }),
      typescript({lib: ["es5", "es6", "dom"], target: "es5"})
    ],
  },
]