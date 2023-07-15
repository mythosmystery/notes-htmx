import { html } from "../lib/html"

export const Home = () => {
  return html`
    <div class="mt-32 flex h-screen flex-col items-center">
      <h1
        class="bg-gradient-to-br from-blue-400 to-pink-400 bg-clip-text py-2 text-5xl font-bold text-transparent"
      >
        Welcome to Typenotes
      </h1>
      <p class="mt-2 text-xl text-slate-500">A simple note taking app</p>

      <a
        id="get-started"
        href="/notes"
        class="mt-20 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 px-4 py-2 text-lg text-white shadow-md transition-all duration-300 hover:scale-110 hover:shadow-xl"
      >
        Get Started
      </a>
    </div>
  `
}
