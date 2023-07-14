import Redis from 'ioredis'

export const client = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis()
