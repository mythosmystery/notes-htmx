import express from 'express'
import { requireAuth } from '@/middleware/auth'
import { r } from '@/lib/html'
import { Home } from '@/views/home'
import { Notes } from '@/views/notes'
import { auth } from './auth'

export const views = express.Router()

views.get('/', (_, res) => {
  r(res, Home())
})

views.get('/notes', requireAuth, (req, res) => {
  r(res, Notes(req.session.user!))
})

views.use('/', auth)
