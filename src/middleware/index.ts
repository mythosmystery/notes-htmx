import { Request, Response, NextFunction } from 'express'

export const logger = (req: Request, res: Response, next: NextFunction) => {
  console.log(new Date(), {
    url: req.url,
    method: req.method,
    ip: req.headers['x-forwarded-for'] || req.ip,
    payload: { ...req.body, ...req.params, ...req.query },
    timestamp: Date.now(),
  })
  next()
}
