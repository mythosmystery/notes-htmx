import * as elements from 'typed-html'
import { html } from '@/lib/html'
import { Layout } from '../layouts/main'

export const Register = () => {
  return (
    <Layout>
      <div class="mb-12 mt-6 bg-gradient-to-br from-blue-400 to-pink-400 bg-clip-text py-2 text-center text-3xl font-bold text-transparent">
        Create an account
      </div>

      <form
        hx-post="/api/register"
        hx-target="#error"
        class="flex flex-col items-center gap-3"
      >
        <input
          class="mt-2 rounded-md border-2 border-slate-400 p-2"
          type="text"
          name="name"
          placeholder="your name"
        />

        <input
          class="mt-2 rounded-md border-2 border-slate-400 p-2"
          type="text"
          name="email"
          placeholder="your email"
        />

        <input
          class="mt-2 rounded-md border-2 border-slate-400 p-2"
          type="password"
          name="password"
          placeholder="your password"
        />

        <p class="text-sm text-slate-500">
          Already have an account?
          <a href="/login" class="text-blue-400 hover:text-purple-500">
            Login
          </a>
        </p>

        <button
          class="mt-3 rounded-full bg-gradient-to-tr from-blue-400 to-pink-400 px-6 py-3 text-slate-200 shadow-md transition-all duration-300 ease-in hover:scale-110 hover:text-white hover:shadow-lg active:scale-90 active:shadow-sm"
          type="submit"
        >
          Register
        </button>
        <div id="error" class="text-sm font-bold text-red-500"></div>
      </form>
    </Layout>
  )
}
