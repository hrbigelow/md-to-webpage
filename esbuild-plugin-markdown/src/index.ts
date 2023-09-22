import { Plugin } from "esbuild";
import { TextDecoder } from "util";
import path from "path";
import fs from "fs-extra";
import { marked } from 'marked';
import { MarkedExtension } from 'marked';

interface MarkdownPluginOptions {
  markedOptions?: MarkedExtension;
}

export const markdownPlugin = (options: MarkdownPluginOptions): Plugin => ({
  name: "markdown",
  setup(build) {
    marked.use(options?.markedOptions);

    // resolve .md files
    build.onResolve({ filter: /\.md$/ }, (args) => {
      if (args.resolveDir === "") return;

      return {
        path: path.isAbsolute(args.path)
          ? args.path
          : path.join(args.resolveDir, args.path),
        namespace: "markdown"
      };
    });

    // load files with "markdown" namespace
    build.onLoad({ filter: /.*/, namespace: "markdown" }, async (args) => {
      const markdownContent = new TextDecoder().decode(
          await fs.readFile(args.path)
        ),
        markdownHTML = marked(markdownContent);

      return {
        contents: JSON.stringify({
          html: markdownHTML,
          raw: markdownContent,
          filename: path.basename(args.path)
        }),
        loader: "json"
      };
    });
  }
});
