// stylis-plugin-rtl ships no types of its own.
declare module 'stylis-plugin-rtl' {
  import type { Middleware } from 'stylis'
  const rtlPlugin: Middleware
  export default rtlPlugin
}
