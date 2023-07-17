import { marked } from 'marked'
import hljs from 'highlight.js'
import { markedHighlight } from 'marked-highlight'

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      return hljs.highlight(code, { language }).value
    },
  }),
  { gfm: true, mangle: false, headerIds: false },
)

export const parseMarkdown = (markdown: string) =>
  marked.parse(markdown.trimStart().trimEnd())
