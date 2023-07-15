import { html } from "../../lib/html"

export function Layout(body: string) {
  return html`
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Typenotes</title>
        <link href="styles.css" rel="stylesheet" />
        <script src="https://unpkg.com/htmx.org@1.9.2"></script>
      </head>
      <body>
        ${body}
      </body>
    </html>
  `
}
