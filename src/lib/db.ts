import { Redis } from '@upstash/redis'


export const db : Redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL || '',
    token: process.env.UPSTASH_REDIS_REST_TOKEN || ''
})
// or solve it like this 
//  export const db = Redis.fromEnv()