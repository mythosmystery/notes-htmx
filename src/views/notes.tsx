import { html } from '@/lib/html'
import { User } from '../models/User'
import { Header } from './components/header'
import { NotePreview } from './components/notePreview'
import { NoteItem } from './components/noteItem'

export const Notes = (user: User) => {
  // TODO: make a better component syntax
  return html`
    ${Header(true)}

    <div class="mt-20 flex h-screen gap-8 overflow-x-clip px-6 py-4">
      <div class="w-1/3">
        <h1 class="text-4xl font-thin text-purple-400">Notes</h1>
        <ul id="notes" class="mt-4">
          ${user.notes.map(NoteItem)}
        </ul>
      </div>
      <div class="w-2/3" id="notePreview">
        ${NotePreview(user.notes[0], false)}
      </div>
    </div>
  `
}
