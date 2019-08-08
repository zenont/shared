// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface KV<T = any> {
  readonly [index: string]: T
}
