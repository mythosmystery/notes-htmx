import { Response } from 'express'
import { Layout } from '../layouts/main'

export const html = (strings: any, ...values: any) => {
  let str = ''
  strings.forEach((string: string, i: number) => {
    str += string + (values[i] || '')
  })
  return str
}

