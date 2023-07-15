import { html } from '@/lib/html'
import { Header } from '@/views/components/header'

export function Layout(body: string) {
  return html`
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Typenotes</title>
        <link href="styles.css" rel="stylesheet" />
        <script src="https://unpkg.com/htmx.org@1.9.2"></script>
        <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `
}
