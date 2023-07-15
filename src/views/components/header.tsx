import { html } from '@/lib/html'

export const Header = (loggedIn: boolean) => {
  return html`
    <nav class="fixed top-0 flex w-full justify-between bg-white px-6 py-4">
      <a class="text-2xl font-thin text-blue-400 hover:text-purple-400" href="/"
        >Home</a
      >
      ${loggedIn
        ? html`
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
