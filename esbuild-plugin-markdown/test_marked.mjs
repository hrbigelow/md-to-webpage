import { marked } from 'marked';
import markedMathExt from './marked_math_ext.mjs';

let mm = new markedMathExt()

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
  xhtml: false
}

// console.log(marked_extensions[0].renderer)

marked.use({ extensions: mm.getExtensions() })
const out = marked.parse('equation: $x=y$ and more text')
console.log(out)

