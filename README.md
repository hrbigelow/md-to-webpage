# Introduction

md-to-webpage is a tool for turning Markdown code with embedded math and
syntax-highlighted code blocks into a webpage.

# Quick Start

This assumes you have a `path/to/notebook.ipynb` that you want to turn into a
webpage.

```bash
git clone https://github.com/hrbigelow/md-to-webpage
cd md-to-webpage/esbuild-plugin-markdown
node build.js
cd md-to-webpage
npm install -D ./esbuild-plugin-markdown
npm install
jupyter nbconvert --to markdown path/to/notebook.ipynb --output content.md

# This will build www/main.js and www/main.js.map
# Will output the localhost:port where you can view your webpage
# To deploy, copy www to a webserver
node script.mjs
```

By default, this includes python and bash code blocks.  See `main.js` to add more. 
