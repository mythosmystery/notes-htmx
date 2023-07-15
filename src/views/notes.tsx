import { html } from '@/lib/html'
import { User } from '../models/User'

export const Notes = (user: User) => {
  return html`
    <nav class="flex justify-between px-6 py-4">
      <a class="text-2xl font-thin text-blue-400 hover:text-purple-400" href="/"
        >Home</a
      >
      <a
        class="text-2xl text-purple-400 hover:cursor-pointer hover:text-red-400"
        hx-post="/api/logout"
        >Log out</a
      >
    </nav>

    <div class="flex gap-8 px-6 py-4">
      <div class="w-1/3">
        <h1 class="text-4xl font-thin text-purple-400">Notes</h1>
        <ul id="notes" class="mt-4">
          ${user.notes.map(
            (note) => html`
              <li class="flex flex-col gap-2">
                <h2 class="text-2xl font-thin text-purple-400">
                  ${note.title}
                </h2>
                <p class="text-lg font-thin text-gray-400">${note.content}</p>
              </li>
            `,
          )}
        </ul>
      </div>
      <div class="w-2/3">
        <form class="flex flex-col gap-4" hx-post="/api/notes">
          <input
            class="rounded-md border border-gray-300 px-4 py-2"
            type="text"
            name="title"
            placeholder="Title"
          />
          <textarea
            class="rounded-md border border-gray-300 px-4 py-2"
            name="content"
            placeholder="Content"
          ></textarea>
          <button
            class="rounded-md bg-purple-400 px-4 py-2 text-white"
            type="submit"
            hx-swap="afterend"
            hx-target="#notes"
          >
            Add note
          </button>
        </form>
      </div>
    </div>
  `
}
