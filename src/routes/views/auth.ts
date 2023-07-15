import { views } from '.'
import { Login } from '@/views/login'
import { Register } from '@/views/register'
import { r } from '@/lib/html'
import express from 'express'

export const auth = express.Router()

auth.get('/login', (_, res) => {
  r(res, Login())
})

auth.get('/register', (_, res) => {
  r(res, Register())
})
