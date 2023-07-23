import { styles } from '../constants'
import * as elements from 'typed-html'
import { parseMarkdown } from '../lib/markdown'
import { Note } from '../models/Note'
import { User } from '../models/User'
import { Header } from '../components/header'
import { Layout } from '../layouts/highlight'

export const NotePage = ({ note, user }: { note: Note; user: User | null }) => {
  const markdown = parseMarkdown(note.content)
  return (
    <Layout>
      <Header user={user} />
      <div class="mr-6 mt-20 flex h-full flex-col items-center px-24">
        <div class="mb-8 text-2xl text-purple-400">{note.title}</div>
        <div class="w-full grow text-slate-700 focus:outline-none dark:text-white">
          <div class="markdown-container">{markdown}</div>
        </div>
        <img
          src="/spinner.gif"
          class="htmx-indicator fixed bottom-0 right-0 m-8 h-20 w-20"
        />
      </div>
      {styles}
    </Layout>
  )
}
