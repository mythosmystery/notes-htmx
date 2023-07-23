import * as elements from 'typed-html'
import express from 'express'
import { requireAuth } from '@/middleware/auth'
import { Home } from '@/pages/home'
import { Notes } from '@/pages/notes'
import { auth } from './auth'
import { Layout } from '@/layouts/highlight'
import { Layout as MainLayout } from '@/layouts/main'
import { getNote, getUser } from '@/lib/cached'
import { NotePage } from '@/pages/note'

export const views = express.Router()

views.get('/', (_, res) => {
  res.send(
    <MainLayout>
      <Home />
    </MainLayout>,
  )
})

views.get('/notes', requireAuth, async (req, res) => {
  const user = await getUser(req.session.user?.id)

  if (!user) {
    return res.redirect('/login')
  }

  res.send(
    <Layout>
      <Notes user={user} />
    </Layout>,
  )
})

views.get('/notes/:id/:slug', async (req, res) => {
  const note = await getNote(+req.params.id)

  if (!note) return res.redirect('/')

  const user = await getUser(req.session.user?.id)
  return res.send(
    <Layout>
      <NotePage note={note} user={user} />
    </Layout>,
  )
})

views.use('/', auth)
