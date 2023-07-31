import * as elements from 'typed-html'
export const Client = ({ children }: elements.Children) => {
  return (
    <div>
      {children}
      <script src="//unpkg.com/alpinejs" defer="true"></script>
    </div>
  )
}
