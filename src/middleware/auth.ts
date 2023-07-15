import { Request, Response, NextFunction } from 'express'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (!req.session?.user) {
    return res.redirect('/login')
  }

  return next()
}
