declare module '*.jpg'
declare module '*.jpeg'

declare module '*.png' {
  const value: any
  export = value
}
