import { html } from '@/lib/html'
import { Note } from '@/models/Note'

export const NotePreview = (note: Note, editMode: boolean) => {
  return html`
    ${editMode
      ? html`
          <div class="-mt-16 flex justify-between">
            <button
              class="mb-1 mt-8 rounded-full bg-blue-400 p-2 font-bold text-white transition-all hover:scale-110 hover:bg-purple-400/50 active:scale-90"
            >
              <iconify-icon
                icon="majesticons:save"
                class="text-2xl"
              ></iconify-icon>
            </button>
            <button
              class="mb-1 mt-8 rounded-full bg-green-400 px-3 py-2 font-bold text-white transition-all hover:scale-110 hover:bg-purple-400/50 active:scale-90"
            >
              <iconify-icon icon="mingcute:add-fill"></iconify-icon>
            </button>
          </div>
          <div
            class="flex h-full flex-col items-center p-2"
            contenteditable="true"
          >
            <div class="mb-8 text-2xl text-purple-400">${note.title}</div>
            <div class="text-slate-700">${note.content}</div>
          </div>
        `
      : html`
          <div
            class="flex h-full flex-col items-center p-2"
            hx-target="#notePreview"
            hx-get="/api/notes/${note.id}?edit=true"
          >
            <div class="mb-8 text-2xl text-purple-400">${note.title}</div>
            <div class="text-slate-700">${note.content}</div>
          </div>
        `}
  `
}
