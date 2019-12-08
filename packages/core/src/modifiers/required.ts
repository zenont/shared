export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends (infer U)[]
    ? DeepRequired<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepRequired<U>[]
    : DeepRequired<T[P]>
}
