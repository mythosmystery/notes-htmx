import { html } from '@/lib/html'
import { Header } from '@/components/header'
import { Children } from 'typed-html'

export function Layout({ children }: Children) {
  return html`
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Typenotes</title>
        <link href="/styles.css" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="//unpkg.com/@highlightjs/cdn-assets@11.7.0/styles/tokyo-night-dark.min.css"
        />
        <script src="https://unpkg.com/htmx.org@1.9.2"></script>
        <script src="https://code.iconify.design/iconify-icon/1.0.7/iconify-icon.min.js"></script>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.css"
        />
      </head>
      <body class="dark:bg-slate-900">
        ${children}
        <script src="https://cdn.jsdelivr.net/npm/notyf@3/notyf.min.js"></script>
        <script>
          const notyf = new Notyf()
          htmx.on('toastSuccess', (e) => {
            notyf.success(e.detail.value)
          })
          htmx.on('toastError', (e) => {
            notyf.error(e.detail.value)
          })
        </script>
      </body>
    </html>
  `
}
