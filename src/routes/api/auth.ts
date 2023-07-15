import { api } from '.'
import { ReqBody } from '@/types'
import bcrypt from 'bcrypt'
import express from 'express'
import { SECRET } from '@/constants'
import { User } from '../../models/User'

export const auth = express.Router()

interface LoginProps {
  email: string
  password: string
}

auth.post('/login', async (req: ReqBody<LoginProps>, res) => {
  const { email, password } = req.body

  if (!email || !password)
    return res.send('Please provide an email and password')

  try {
    const user = await User.findOne({
      where: { email },
      relations: { notes: true },
    })

    console.log(user)

    if (!user)
      return res.send(
        'No account found, <a href="/register" class="text-blue-500 hover:text-purple-500">Register</a>',
      )

    if (!bcrypt.compareSync(password, user.hash))
      return res.send('Invalid email or password')

    req.session.user = user

    res.setHeader('HX-Redirect', '/notes')
    return res.send('')
  } catch (err) {
    console.log(err)
    return res.send('Invalid email or password')
  }
})

type RegisterProps = LoginProps & { name: string }

auth.post('/register', async (req: ReqBody<RegisterProps>, res) => {
  const { email, password, name } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  if (!email || !password)
    return res.send('Please provide an email and password')

  try {
    const newUser = User.create({
      email,
      name,
      hash: hashedPassword,
      notes: [
        {
          title: 'Welcome to your first note!',
          slug: 'welcome-to-your-first-note',
          content: 'This is your first note, feel free to delete it.',
        },
      ],
    })

    const user = await newUser.save()

    req.session.user = user

    res.setHeader('HX-Redirect', '/notes')
    return res.send()
  } catch (err) {
    console.log(err)
    return res.send(
      'Account already exists <a href="/login" class="text-blue-500 hover:text-purple-500">Login</a>',
    )
  }
})

auth.post('/logout', (req, res) => {
  console.log('here', req.session)
  req.session.destroy(() => {
    res.setHeader('HX-Redirect', '/')
    return res.send()
  })
})
