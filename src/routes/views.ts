import express from 'express'
import { requireAuth } from '../middleware/auth'

export const views = express.Router()

// Home view
views.get('/', (req, res) => {
  res.render('home', {})
})

// Notes view
views.get('/notes', requireAuth, (req, res) => {
  res.render('notes', {})
})

// Login view
views.get('/login', (req, res) => {
  res.render('login', {})
})
