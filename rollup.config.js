import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import sass from 'rollup-plugin-sass'
import css from 'rollup-plugin-css-only'

import pkg from './package.json'

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  external: [
    'react',
    'react-dom',
    'prop-types',
    'redux'
  ],
  globals: {
    'video.js': 'videojs'
  },
  plugins: [
    sass({
      output: 'dist/video-react.css',
      outputStyle: 'compressed',
      sourceMap: true,
      sourceMapContents: true,
    }),
    css({
      output: 'dist/videojs.css',
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: [
        'external-helpers'
      ]
    }),
    resolve(),
    commonjs()
  ]
}
