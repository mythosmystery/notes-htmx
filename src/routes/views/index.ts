import express from 'express'
import crypto from 'crypto'
import { requireAuth } from '@/middleware/auth'
import { r } from '@/lib/html'
import { Home } from '@/views/home'
import { Notes } from '@/views/notes'
import { auth } from './auth'
import { Layout } from '@/views/layouts/highlight'
import { User } from '@/models/User'
import { getUser } from '../../lib/cached'

export const views = express.Router()

views.get('/', (_, res) => {
  r(res, Home())
})

views.get('/notes', requireAuth, async (req, res) => {
  const user = await getUser(req.session.user?.id!)

  if (!user) {
    return res.redirect('/login')
  }

  res.send(Layout(Notes(user)))
})

views.use('/', auth)
