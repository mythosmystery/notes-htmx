import { html } from '@/lib/html'
import { User } from '../models/User'
import { Header } from './components/header'
import { NotePreview } from './components/notePreview'

export const Notes = (user: User) => {
  return html`
    ${Header(true)} // TODO: make a better component syntax

    <div class="mt-16 flex h-screen gap-8 px-6 py-4">
      <div class="w-1/3">
        <h1 class="text-4xl font-thin text-purple-400">Notes</h1>
        <ul id="notes" class="mt-4">
          ${user.notes.map(
            (note) => html`
              <li
                class="flex flex-col gap-2 border-l border-slate-100 p-2 hover:cursor-pointer hover:bg-slate-100/50"
                hx-get="/api/notes/${note.id}"
                hx-target="#notePreview"
              >
                <h2 class="text-2xl font-thin text-purple-400">
                  ${note.title}
                </h2>
                <p class="text-lg font-thin text-gray-400">${note.content}</p>
              </li>
            `,
          )}
        </ul>
      </div>
      <div class="w-2/3" id="notePreview">
        ${NotePreview(user.notes[0], false)}
      </div>
    </div>
  `
}
