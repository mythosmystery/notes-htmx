import 'module-alias/register'
import 'reflect-metadata'
import express from 'express'
import 'dotenv/config'
import { logger } from './middleware'
import { views } from './routes/views'
import { api } from './routes/api'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'
import RedisStore from 'connect-redis'
import { client } from './lib/redis'
import { SECRET } from './constants'
import { AppDataSource } from './lib/datasource'

const app = express()
const PORT = process.env.PORT || 3000

app.use(
  session({
    store: new RedisStore({ client }),
    secret: SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    },
  }),
)

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger)

app.use('/', views)
app.use('/api', api)

AppDataSource.initialize().then(() => {
  app.listen(+PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`)
  })
})
