import { DataSource } from 'typeorm'
import { User } from '../models/User'
import { Note } from '../models/Note'

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, Note],
})
