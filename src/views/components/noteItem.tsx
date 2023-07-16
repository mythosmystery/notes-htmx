import { html } from '@/lib/html'
import { Note } from '@/models/Note'

export const NoteItem = (note: Note) => {
  return html`
    <li
      class="mt-2 flex max-h-24 flex-col gap-2 border-l border-slate-100 p-2 hover:cursor-pointer hover:bg-slate-100/50 dark:hover:bg-slate-700"
      hx-get="/api/notes/${note.id}"
      hx-target="#notePreview"
    >
      <div class="flex justify-between">
        <h2 class="truncate text-2xl font-thin text-purple-500">
          ${note.title}
        </h2>
        <button
          class="rounded-full p-2 font-bold text-red-400 transition-all hover:scale-110 hover:text-red-500 active:scale-90"
          hx-delete="/api/notes/${note.id}"
          hx-target="#notes"
        >
          <iconify-icon
            icon="majesticons:trash"
            class="text-2xl"
          ></iconify-icon>
        </button>
      </div>
      <p class="truncate pr-6 text-lg font-thin text-gray-600 dark:text-white">
        ${note.content}
      </p>
    </li>
  `
}
