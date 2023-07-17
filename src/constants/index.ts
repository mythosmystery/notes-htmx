import { html } from '../lib/html'

export const SECRET = process.env.TOKEN_SECRET || 'secret'

export const styles = html`
  <style>
    .markdown-container h1 {
      font-size: 3rem;
      margin: 0.5rem 0;
    }
    .markdown-container h2 {
      font-size: 2rem;
      margin: 0.4rem 0;
    }
    .markdown-container h3 {
      font-size: 1.5rem;
      margin: 0.3rem 0;
    }
    .markdown-container h4 {
      font-size: 1.25rem;
      margin: 0.2rem 0;
    }
    .markdown-container ul {
      margin-left: 1rem;
    }
    .markdown-container ol {
      margin-left: 1.5rem;
    }
    .markdown-container li {
      margin-bottom: 0.2rem;
      margin-left: 0.5rem;
    }
    .markdown-container a:hover {
      text-decoration: underline;
      color: #f02ffa;
    }
    .markdown-container pre {
      background-color: #1a1b26;
      border-radius: 0.5rem;
      padding: 0.75rem;
    }
    .markdown-container a {
      color: #392ffa;
    }
    .markdown-container p[align='center'] {
      display: flex;
      flex-direction: row;
      margin: 1rem 0;
      justify-content: center;
      gap: 0.5rem;
    }
    .markdown-container blockquote {
      border-left: 2px solid #f02ffa;
      padding-left: 1rem;
      margin: 0.4rem 1rem;
    }
    .markdown-container code {
      padding: 0.15rem 0.3rem;
      border-radius: 0.3rem;
      color: #f02ffa99;
      border-radius: 0.5rem;
      margin: 0.7rem 0;
    }
    .markdown-container table {
      border: 1px solid #333333;
      padding: 1rem;
      overflow-x: scroll !important;
    }
    .markdown-container th {
      border: 1px solid #333333;
      padding: 0.5rem;
    }
    .markdown-container td {
      border: 1px solid #333333;
      padding: 0.5rem;
    }
    .markdown-container tr:nth-child(even) {
      background-color: '#dfdfff';
    }
    .markdown-container hr {
      border: 2px solid #333444;
    }
  </style>
`
