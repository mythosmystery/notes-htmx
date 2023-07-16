import { html } from '@/lib/html'
import { Note } from '@/models/Note'

export const NoteItem = (note: Note) => {
  return html`
    <li
      class="flex flex-col gap-2 border-l border-slate-100 p-2 hover:cursor-pointer hover:bg-slate-100/50"
      hx-get="/api/notes/${note.id}"
      hx-target="#notePreview"
    >
      <h2 class="truncate text-2xl font-thin text-purple-400">${note.title}</h2>
      <p class="truncate pr-6 text-lg font-thin text-gray-400">
        ${note.content}
      </p>
    </li>
  `
}
