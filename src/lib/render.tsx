import * as elements from 'typed-html'

type Component = (props: any) => string

export const r = (Layout: Component, Page: Component) => {
  return (
    <Layout>
      <Page />
    </Layout>
  )
}
