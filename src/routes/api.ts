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

  res.setHeader('HX-Redirect', '/notes')
  return res.send('')
})

type RegisterProps = LoginProps & { name: string }

api.post('/register', async (req: ReqBody<RegisterProps>, res) => {
  const { email, password, name } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  if (!email || !password)
    return res.send('Please provide an email and password')

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hash: hashedPassword
      }
    })

    req.session.user = user

    res.setHeader('HX-Redirect', '/notes')
    return res.send()
  } catch (err) {
    console.log(err)
    return res.send(
      'Account already exists <a href="/login" class="text-blue-500 hover:text-purple-500">Login</a>'
    )
  }
})
