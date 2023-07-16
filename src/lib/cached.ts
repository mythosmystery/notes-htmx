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
