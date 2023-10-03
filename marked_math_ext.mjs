// var katex = require('katex')
import katex from 'katex';

class markedMathExt {
	
	constructor() {
	}

  getExtensions() {
    // var do_wrap = this.do_wrap
    // this should accumulate between calls
    var katex_macros = {};

    function render_expression(token, is_block) {
      var tok = token.text.replace(/\\mbox/g, '\\text');
      var html;
      try {
        html = katex.renderToString(tok, {
          macros: katex_macros,
          throwOnError: true,
          globalGroup: true,
          displayMode: is_block 
        });
      } catch (err) {
        error_msg = `Got ${err} processing:\n\n${token.text}`
        console.error(error_msg);
        throw new Error(error_msg);
      }
      // console.log(`Katex rendered:\n${html}\n`)
      return html 
      // return `{@html \`${esc}\`}`
    }

    var math_block = {
      name: 'math_block',
      level: 'block',
      // returns position of next match, or undefined if no match
      //start(src) { return src.match(/\$\$/)?.index; },
      start(src) { return src.match(/(\\begin{[^\}]+}|\$\$)/)?.index; },
      tokenizer(src, tokens) {
        // rule matches at beginning of string.  this must mean
        // that the tokenizer is called with different slices of the source
        // const rule = /^\\begin{equation}(.+?)\\end{equation}|^\$\$(.+?)\$\$/s;
        const eqn_rule = /^(?<latex1>\\begin{(?<block>[^\}]+)}.+?\\end{\k<block>})/
        const dollar_rule = /^(?<latex2>\$\$.+?\$\$)/
        const rule = RegExp(eqn_rule.source + '|' + dollar_rule.source, 's')
        const match = rule.exec(src); // returns a weird array/object hybrid thing 

        if (match) {
          // console.log(match)
          var token = {
            type: 'math_block',
            raw: match[0],
            text: match.groups.latex1 || match.groups.latex2
          };
          return token;
        }
      },
      renderer(token) {
        var tok = token.text.replace(/\\mbox/g, '\\text');
        // console.log(`In math_block with ${token.text}`)
        var html = render_expression(token, true) 
        var par = `<p>${html}</p>`
        // console.log(par)
        // if (do_wrap) return wrap_html(par)
        return par
      }
    }

    var math_inline = {
      name: 'math_inline',
      level: 'inline',
      start(src) { return src.match(/\$/)?.index; },
      tokenizer(src, tokens) {
        const rule = /^\$([^\$]+?)\$/s;
        const match = rule.exec(src);
        if (match) {
          return {
            type: 'math_inline',
            raw: match[0],
            text: match[1]
          };
        }
      },
      renderer(token) {
        // console.log(`In math_inline with ${token.text}`)
        return render_expression(token, false)
        // if (do_wrap) return wrap_html(token.text)
        // else return token.text
      }
    }

    var verbatim = {
      name: 'verbatim',
      level: 'block',
      start(src) { return src.match(/\${/s)?.index; },
      tokenizer(src, tokens) {
        const rule = /^\${(.+?)}\$/s;
        const match = rule.exec(src);
        if (match) {
          return {
            type: 'verbatim',
            raw: match[0],
            text: match[1]
          };
        }
      },

      renderer(token) {
        // console.log(`in verbatim, got ${token.text}`);
        return token.text;
      }
    }

    return [ math_block, math_inline, verbatim ]
  }
}

export default markedMathExt;

