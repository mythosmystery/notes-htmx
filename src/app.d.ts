import { User } from './models/User'

declare module 'express-session' {
  interface SessionData {
    user: User
    darkMode?: boolean
  }
}
