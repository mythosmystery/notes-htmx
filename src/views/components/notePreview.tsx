import { html } from '@/lib/html'
import { Note } from '@/models/Note'

export const NotePreview = (note: Note, editMode: boolean) => {
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
              <div class="mt-12" id="noteResult"></div>
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
            <textarea
              readonly="true"
              wrap="hard"
              class="w-full grow text-slate-700 focus:outline-none"
            >
                ${note.content}
              </textarea
            >
            <img
              src="/spinner.gif"
              class="htmx-indicator fixed bottom-0 right-0 m-8 h-20 w-20"
            />
          </div>
        `}
  `
}
