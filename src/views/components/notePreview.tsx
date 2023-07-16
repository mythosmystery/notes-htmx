import { html } from '@/lib/html'
import { Note } from '@/models/Note'
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
)

export const NotePreview = (note: Note, editMode: boolean) => {
  const markdown = marked.parse(note.content.trimStart().trimEnd())
  console.log(markdown)
  return html`
    ${editMode
      ? html`
          <form hx-post="/api/notes/save/${note.id}" hx-target="#notes">
            <div class="-mt-16 flex items-center justify-between">
              <button
                class="mb-1 mt-8 rounded-full bg-blue-400 p-2 font-bold text-white transition-all hover:scale-110 hover:bg-purple-400/50 active:scale-90"
              >
                <iconify-icon
                  icon="majesticons:save"
                  class="text-2xl"
                ></iconify-icon>
              </button>
              <button
                class="mb-1 mt-8 rounded-full bg-blue-400 p-2 font-bold text-white transition-all hover:scale-110 hover:bg-purple-400/50 active:scale-90"
                hx-get="/api/notes/${note.id}"
                hx-target="#notePreview"
              >
                <iconify-icon
                  icon="majesticons:eye-line"
                  class="text-2xl"
                ></iconify-icon>
              </button>
            </div>
            <div
              class="flex h-full flex-col items-center p-2"
              contenteditable="true"
            >
              <input
                type="text"
                name="title"
                class="mb-8 w-full text-center text-2xl text-purple-400 focus:outline-none"
                value="${note.title}"
              />
              <textarea
                name="content"
                wrap="hard"
                class="w-full grow text-slate-700 focus:outline-none"
              >
                ${note.content}
              </textarea
              >
            </div>
          </form>
        `
      : html`
          <div
            class="mr-6 flex h-full flex-col items-center"
            hx-target="#notePreview"
            hx-get="/api/notes/${note.id}?edit=true"
          >
            <div class="mb-8 text-2xl text-purple-400">${note.title}</div>
            <div class="w-full grow text-slate-700 focus:outline-none">
              <div class="markdown-container">${markdown}</div>
            </div>
            <img
              src="/spinner.gif"
              class="htmx-indicator fixed bottom-0 right-0 m-8 h-20 w-20"
            />
          </div>
          ${styles}
        `}
  `
}

const styles = html`
  <style>
    .markdown-container h1 {
      font-size: 3rem;
      margin: 0.5rem 0;
    }
    .markdown-container h2 {
      font-size: 2rem;
      margin: 0.4rem 0;
    }
    .markdown-container h3 {
      font-size: 1.5rem;
      margin: 0.3rem 0;
    }
    .markdown-container h4 {
      font-size: 1.25rem;
      margin: 0.2rem 0;
    }
    .markdown-container ul {
      margin-left: 1rem;
    }
    .markdown-container ol {
      margin-left: 1.5rem;
    }
    .markdown-container li {
      margin-bottom: 0.2rem;
      margin-left: 0.5rem;
    }
    .markdown-container a:hover {
      text-decoration: underline;
      color: #f02ffa;
    }
    .markdown-container pre {
      background-color: #282c34;
      border-radius: 0.5rem;
      padding: 0.75rem;
    }
    .markdown-container a {
      color: #392ffa;
    }
    .markdown-container p[align='center'] {
      display: flex;
      flex-direction: row;
      margin: 1rem 0;
      justify-content: center;
      gap: 0.5rem;
    }
    .markdown-container blockquote {
      border-left: 2px solid #f02ffa;
      padding-left: 1rem;
      margin: 0.4rem 1rem;
    }
    .markdown-container code {
      padding: 0.15rem 0.3rem;
      border-radius: 0.3rem;
      color: #f02ffa99;
      border-radius: 0.5rem;
      margin: 0.7rem 0;
    }
    .markdown-container table {
      border: 1px solid #333333;
      padding: 1rem;
      overflow-x: scroll !important;
    }
    .markdown-container th {
      border: 1px solid #333333;
      padding: 0.5rem;
    }
    .markdown-container td {
      border: 1px solid #333333;
      padding: 0.5rem;
    }
    .markdown-container tr:nth-child(even) {
      background-color: '#dfdfff';
    }
    .markdown-container hr {
      border: 2px solid #333444;
    }
  </style>
`
