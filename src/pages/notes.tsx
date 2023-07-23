import * as elements from 'typed-html'

import { User } from '../models/User'
import { Header } from '../components/header'
import { NotePreview } from '../components/notePreview'
import { NoteItem } from '../components/noteItem'
import { Layout } from '../layouts/highlight'
import { html } from '../lib/html'

export const Notes = ({ user }: { user: User }) => {
  return (
    <Layout>
      <Header user={user} />
      <div class="mt-20 flex h-screen gap-8 overflow-x-clip px-6 py-4">
        <div class="w-1/3">
          <div class="flex items-center justify-between">
            <h1 class="text-4xl font-thin text-purple-400">Notes</h1>
            <button
              class="font-bol rounded-full p-2 text-blue-400 transition-all hover:scale-110 hover:bg-slate-200/50 hover:text-purple-400 active:scale-90"
              hx-post="/api/notes/new"
              hx-target="#notes"
            >
              {html`<iconify-icon
                icon="majesticons:plus"
                class="text-2xl"
              ></iconify-icon>`}
            </button>
          </div>
          <ul id="notes" class="mt-4">
            {user.notes.map((note) => (
              <NoteItem note={note} />
            ))}
          </ul>
        </div>
        <div class="w-2/3" id="notePreview">
          <NotePreview note={user.notes[0]} editMode={false} />
        </div>
      </div>
    </Layout>
  )
}
