/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import path from 'path';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import monaco from 'rollup-plugin-monaco-editor';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

export default {
  input: path.resolve(__dirname, './index.html'),
  // output: {
  //   file: 'my-element.bundled.js',
  //   format: 'esm',
  // },
  output: {
    dir: 'dist',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    replace({'Reflect.decorate': 'undefined'}),
    resolve({
      mainFields: [
        'exports',
        'browser:module',
        'browser',
        'module',
        'main',
      ].filter(Boolean),
      extensions: ['.mjs', '.cjs', '.js', '.json', '.css'], // Default: [ '.mjs', '.js', '.json', '.node' ]
      // whether to prefer built-in modules (e.g. `fs`, `path`) or local ones with the same names
      preferBuiltins: true, // Default: true
      dedupe: [], // userDefinedRollup.dedupe,
    }),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    postcss(),
    monaco({
      // languages: ['json'],
    }),
    // nodeResolve(),
    commonjs(),
    summary(),
  ],
};
