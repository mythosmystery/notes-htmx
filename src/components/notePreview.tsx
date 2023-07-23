import * as elements from 'typed-html'
import { Note } from '@/models/Note'
import { parseMarkdown } from '@/lib/markdown'
import { styles } from '@/constants'
import { html } from '../lib/html'

export const NotePreview = ({
  note,
  editMode,
}: {
  note: Note
  editMode: boolean
}) => {
  const markdown = parseMarkdown(note.content)
  return (
    <div>
      {editMode ? (
        <form hx-post="/api/notes/save/${note.id}" hx-target="#notes">
          <div class="-mt-16 flex items-center justify-between">
            <button class="mb-1 mt-8 rounded-full bg-blue-400 p-2 font-bold text-white transition-all hover:scale-110 hover:bg-purple-400/50 active:scale-90">
              {html`<iconify-icon
                icon="majesticons:save"
                class="text-2xl"
              ></iconify-icon>`}
            </button>
            <button
              class="mb-1 mt-8 rounded-full bg-blue-400 p-2 font-bold text-white transition-all hover:scale-110 hover:bg-purple-400/50 active:scale-90"
              hx-get="/api/notes/${note.id}"
              hx-target="#notePreview"
            >
              {html`<iconify-icon
                icon="majesticons:eye-line"
                class="text-2xl"
              ></iconify-icon>`}
            </button>
          </div>
          <div
            class="flex h-full flex-col items-center p-2"
            contenteditable="true"
          >
            <input
              type="text"
              name="title"
              class="mb-8 w-full text-center text-2xl text-purple-400 focus:outline-none dark:bg-slate-900"
              value="${note.title}"
            />
            <textarea
              name="content"
              wrap="hard"
              class="w-full grow text-slate-700 focus:outline-none dark:bg-slate-900 dark:text-white"
            >
              {note.content}
            </textarea>
          </div>
        </form>
      ) : (
        <div
          class="mr-6 flex h-full flex-col items-center"
          hx-target="#notePreview"
          hx-get="/api/notes/${note.id}?edit=true"
        >
          <div class="mb-8 text-2xl text-purple-400">{note.title}</div>
          <div class="w-full grow text-slate-700 focus:outline-none dark:text-white">
            <div class="markdown-container">{markdown}</div>
          </div>
          <img
            src="/spinner.gif"
            class="htmx-indicator fixed bottom-0 right-0 m-8 h-20 w-20"
          />
          {styles}
        </div>
      )}
    </div>
  )
}
