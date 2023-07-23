import * as elements from 'typed-html'
import { Login } from '@/pages/login'
import { Register } from '@/pages/register'
import express from 'express'
import { Layout } from '@/layouts/main'

export const auth = express.Router()

auth.get('/login', (_, res) => {
  res.send(<Login />)
})

auth.get('/register', (_, res) => {
  res.send(<Register />)
})
