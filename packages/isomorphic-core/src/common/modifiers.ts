export type Maybe<T> = T | null | undefined
export type Null<T> = T | null
export type MutableRequired<T> = { -readonly [P in keyof T]-?: T[P] }
export type ReadonlyPartial<T> = { +readonly [P in keyof T]+?: T[P] }
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepPartial<U>[]
    : DeepPartial<T[P]>
}
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends (infer U)[]
    ? DeepRequired<U>[]
    : T[P] extends readonly (infer U)[]
    ? readonly DeepRequired<U>[]
    : DeepRequired<T[P]>
}
