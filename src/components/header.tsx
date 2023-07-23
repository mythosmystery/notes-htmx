import * as elements from 'typed-html'
import { User } from '@/models/User'

export const Header = ({ user }: { user?: User | null }) => {
  const loggedIn = !!user
  return (
    <nav class="fixed top-0 flex w-full justify-between bg-white px-6 py-4 dark:bg-slate-900">
      <a
        class="w-1/2 text-2xl font-thin text-blue-400 hover:text-purple-400"
        href="/"
      >
        Home
      </a>
      {loggedIn ? (
        <div class="flex grow items-center justify-between">
          <p class="text-2xl font-thin text-purple-400">Hi {user.name}</p>
          <a
            class="text-2xl text-purple-400 hover:cursor-pointer hover:text-red-400"
            hx-post="/api/logout"
          >
            Log out
          </a>
        </div>
      ) : (
        <a
          class="text-2xl text-purple-400 hover:cursor-pointer hover:text-red-400"
          href="/login"
        >
          Log in
        </a>
      )}
    </nav>
  )
}
