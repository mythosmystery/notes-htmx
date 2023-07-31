import * as elements from 'typed-html'

export const Counter = () => {
  return (
    <div x-data="{ count: 0 }">
      <button x-on:click="count++">Increment</button>
      <span x-text="count"></span>
    </div>
  )
}
