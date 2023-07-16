import { Note } from '../models/Note'
import { User } from '../models/User'
import { cache } from './redis'

export const getUser = cache(async (userId: number) => {
  const user = await User.findOne({
    where: { id: userId },
    relations: { notes: true },
  })

  if (!user) return null

  return user
})

export const getNote = cache(async (noteId: number) => {
  const note = await Note.findOne({
    where: { id: noteId },
  })

  if (!note) return null

  return note
})
