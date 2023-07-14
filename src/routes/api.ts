import express from 'express'
import { ReqBody } from '../types'
import { prisma } from '../lib/prisma'
import bcrypt from 'bcrypt'

export const api = express.Router()

interface LoginProps {
  email: string
  password: string
}

api.post('/login', async (req: ReqBody<LoginProps>, res) => {
  console.log(req.body)

  const { email, password } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  if (!email || !password)
    return res.send('Please provide an email and password')

  const user = await prisma.user.findUnique({ where: { email } })

  if (!user || user.hash !== hashedPassword)
    return res.send('Invalid email or password')

  req.session.user = user
  return res.redirect('/notes')
})
