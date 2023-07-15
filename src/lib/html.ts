import { Response } from "express"
import { Layout } from "../views/layouts/main"

export const html = (strings: any, ...values: any) => {
  let str = ""
  strings.forEach((string: string, i: number) => {
    str += string + (values[i] || "")
  })
  return str
}

/**
 * This function is used to send a template wrapped in the main layout
 */
export const r = (res: Response, body: string) => {
  res.setHeader("Content-Type", "text/html")
  res.send(Layout(body))
}
