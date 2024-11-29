#!/usr/bin/env node

const esbuild = require('esbuild')
const copyStaticFiles = require('esbuild-copy-static-files')
const { default: wasmLoader } = require('esbuild-plugin-wasm')

esbuild.build({
  entryPoints: ['./src/init.mjs'],
  outfile: './dist/out.mjs',
  bundle: true,
  minify: false,
  sourcemap: true,
  format: 'esm',
  loader: {
    '.js': 'jsx',
    //'.wasm': 'file',  // Add this line to handle .wasm files
  },
  plugins: [
    copyStaticFiles({
        src: './static',
        dest: './dist',
        dereference: true,
        errorOnExist: false,
        preserveTimestamps: true,
        recursive: true,
      }),
      wasmLoader({
        // (Default) Deferred mode copies the WASM binary to the output directory,
        // and then `fetch()`s it at runtime. This is the default mode.
        mode: 'deferred'
    })
  ],
})
.catch(err => {
  console.error(err);
  process.exit(1)
});