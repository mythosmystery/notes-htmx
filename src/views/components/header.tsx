import { html } from '@/lib/html'
import { User } from '@/models/User'

export const Header = (user: User) => {
  const loggedIn = !!user
  return html`
    <nav
      class="fixed top-0 flex w-full justify-between bg-white px-6 py-4 dark:bg-slate-900"
    >
      <a class="text-2xl font-thin text-blue-400 hover:text-purple-400" href="/"
        >Home</a
      >
      ${loggedIn
        ? html`
            <p class="text-2xl font-thin text-purple-400">Hi ${user.name}</p>
            <a
              class="text-2xl text-purple-400 hover:cursor-pointer hover:text-red-400"
              hx-post="/api/logout"
              >Log out</a
            >
          `
        : html`
            <a
              class="text-2xl text-purple-400 hover:cursor-pointer hover:text-red-400"
              href="/login"
              >Log in</a
            >
          `}
    </nav>
  `
}
