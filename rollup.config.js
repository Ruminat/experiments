/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import typescript from '@rollup/plugin-typescript';
import postcss from 'rollup-plugin-postcss';
import commonjs from '@rollup/plugin-commonjs';
import monaco from 'rollup-plugin-monaco-editor';
import { nodeResolve } from '@rollup/plugin-node-resolve';

import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';

const commonShit = {
  inlineDynamicImports: true,
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
    typescript(),
    postcss(),
    monaco({
      // languages: ['json'],
    }),
    nodeResolve(),
    commonjs(),
    summary(),
  ],
}

function addInput(pagePath, title) {
  return {
    // input: path.resolve(__dirname, `${pagePath}/${title}.ts`),
    input: `${pagePath}/index.ts`,
    output: {
      file: `dist/${title}.js`,
      format: 'esm'
    },
    ...commonShit,
  }
}

export default [
  addInput('src/pages/home', 'home'),
  addInput('src/pages/about', 'about'),
  addInput('src/pages/japanese', 'japanese'),
  // addInput('src/pages/random', 'random'),
  // addInput('src/pages/calq', 'calq'),
]
