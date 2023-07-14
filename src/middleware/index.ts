import { Request, Response, NextFunction } from 'express'

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log({
    time: Date.now(),
    url: req.url,
    method: req.method,
    payload: { ...req.body, ...req.params, ...req.query }
  })
  next()
}
