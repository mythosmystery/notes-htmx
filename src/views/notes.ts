import { User } from "@prisma/client"
import { html } from "../lib/html"

export const Notes = (user: User) => {
  return html`
    <nav class="flex justify-between px-6 py-4">
      <a class="text-2xl font-thin text-blue-400" href="/">Home</a>
      <a class="text-2xl text-purple-400" hx-target="/api/logout">Log out</a>
    </nav>

    <div>notes page for ${user.name}</div>
  `
}
