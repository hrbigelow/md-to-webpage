import * as esbuild from 'esbuild';
import plugin from 'esbuild-plugin-markdown';
import markedMathExt from './marked_math_ext.mjs';

const markdownPlugin = plugin.markdownPlugin
let marked_extensions = (new markedMathExt()).getExtensions()

var options = {
  breaks: true,
  pedantic: false,
  gfm: true,
  tables: true,
  headerIds: false,
  mangle: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
  extensions: marked_extensions
}


let ctx = await esbuild.context({
  entryPoints: ['main.js'],
  bundle: true,
  outdir: 'www',
  sourcemap: true,
  plugins: [
    markdownPlugin({ markedOptions: options })
  ]
})

await ctx.watch()

let { host, port } = await ctx.serve({
  servedir: 'www'
})

// new EventSource('/esbuild').addEventListener('change', () => location.reload())


console.log(`Serving on ${host}:${port}`)

