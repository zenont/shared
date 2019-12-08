import { Primitive } from '../common'

export type Mutable<T> = T extends Primitive
  ? T
  : T extends ReadonlyArray<infer U>
  ? MutableArray<U>
  : T extends ReadonlyMap<infer K, infer V>
  ? MutableMap<K, V>
  : T extends ReadonlySet<infer M>
  ? MutableSet<M>
  : MutableObject<T>

export type MutableArray<T> = Array<Mutable<T>>
export type MutableMap<K, V> = Map<Mutable<K>, Mutable<V>>
export type MutableSet<T> = Set<Mutable<T>>
export type MutableObject<T> = { -readonly [K in keyof T]: Mutable<T[K]> }
