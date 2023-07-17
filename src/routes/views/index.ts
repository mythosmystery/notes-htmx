import express from 'express'
import crypto from 'crypto'
import { requireAuth } from '@/middleware/auth'
import { r } from '@/lib/html'
import { Home } from '@/views/home'
import { Notes } from '@/views/notes'
import { auth } from './auth'
import { Layout } from '@/views/layouts/highlight'
import { User } from '@/models/User'
import { getNote, getUser } from '../../lib/cached'
import { NotePage } from '../../views/note'

export const views = express.Router()

views.get('/', (_, res) => {
  r(res, Home())
})

views.get('/notes', requireAuth, async (req, res) => {
  const user = await getUser(req.session.user?.id)

  if (!user) {
    return res.redirect('/login')
  }

  res.send(Layout(Notes(user)))
})

views.get('/notes/:id/:slug', async (req, res) => {
  const note = await getNote(+req.params.id)

  if (!note) return res.redirect('/')

  const user = await getUser(req.session.user?.id)
  return res.send(Layout(NotePage(note, user)))
})

views.use('/', auth)
