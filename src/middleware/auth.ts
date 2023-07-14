import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { SECRET } from '../constants'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session.user) return res.redirect('/login')

  next()
}
