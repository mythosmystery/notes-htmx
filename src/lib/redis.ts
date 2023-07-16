import Redis from 'ioredis'
import crypto from 'crypto'
import NodeCache from 'node-cache'

const localCache = new NodeCache({ stdTTL: 60 * 60 * 24 })

export const client = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis()

const generateKey = (params: Record<string, any>) => {
  const hash = crypto.createHash('sha256')
  hash.update(JSON.stringify(params))
  return hash.digest('hex')
}

export const cache = <T extends (...rest: any) => any>(func: T) => {
  const returnFunc = async (...rest: Parameters<T>): Promise<ReturnType<T>> => {
    // Generate a key specific to the function name and its arguments.
    const key = generateKey({ funcData: func.toString() + rest })
    console.log('Key', key)

    // Check local cache first
    const valueFromLocalCache = localCache.get<ReturnType<T>>(key)
    if (valueFromLocalCache) {
      console.log('Returning data from local cache')
      return valueFromLocalCache
    }

    // If not in local cache, check in redis
    const valueFromRedis = await client.get(key)
    if (valueFromRedis) {
      console.log('Returning data from Redis')
      // Store this key in local cache as well
      localCache.set(key, JSON.parse(valueFromRedis))
      return JSON.parse(valueFromRedis)
    }

    // If the key is not in the cache, run the function
    const result = await func(...(rest as any))
    console.log('Returning data from function')

    // Then store the result in Redis and local cache for future invocations
    if (result) {
      client.set(key, JSON.stringify(result))
      localCache.set(key, result)
    }

    return result
  }

  returnFunc.invalidate = async (...rest: Parameters<T>) => {
    const key = generateKey({ funcData: func.toString() + rest })
    console.log('Invalidating key', key)
    localCache.del(key)
    await client.del(key)
  }

  return returnFunc
}

export const invalidate = async (...rest: any) => {
  const key = generateKey(rest)
  await client.del(key)
  localCache.del(key)
}
