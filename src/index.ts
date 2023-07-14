import express from 'express'
import { create } from 'express-handlebars'
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

const app = express()
const hbs = create()
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
      maxAge: 1000 * 60 * 60 * 24 * 7
    }
  })
)

app.use(cookieParser())
app.use(express.json())
app.use(cors())

app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')
app.set('views', 'src/views')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.use(logger)

app.use('/', views)
app.use('/api', api)

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`)
})
