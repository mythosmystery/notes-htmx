import { Request } from 'express'

export interface User {
  id: string
  email: string
}

export type ReqBody<T> = Request<any, any, T>
