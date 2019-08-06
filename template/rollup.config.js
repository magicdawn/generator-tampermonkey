import fs from 'fs'
import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

// 打包去除 `@require file:// ` 路径
let banner = fs.readFileSync(__dirname + '/src/banner.user.js', 'utf8')
banner = banner
  .split('\n')
  .filter(line => !line.includes('file:///'))
  .join('\n')

export default {
  input: __dirname + '/src/main.js',
  external: ['axios', 'jquery'],
  plugins: [
    json(),

    globals(),
    builtins(),

    commonjs(),
    nodeResolve({
      // preferBuiltins: true,
      browser: true,
    }),
  ],

  output: {
    format: 'iife',
    file: __dirname + '/dist/main.user.js',

    banner,
    globals: {
      axios: 'axios',
      crypto: 'crypto',
      jquery: '$',
    },
  },
}
