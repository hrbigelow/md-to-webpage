import content from './content.md';
import hljs from 'highlight.js/lib/core';
import python from 'highlight.js/lib/languages/python';
import bash from 'highlight.js/lib/languages/bash';
// see highlight.js docs for all available languages

hljs.registerLanguage('python', python);
hljs.registerLanguage('bash', bash);

let article = document.getElementById('article')
article.innerHTML = content.html;

hljs.highlightAll();

