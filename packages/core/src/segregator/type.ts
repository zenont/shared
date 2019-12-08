// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface TypeOf<T = any> {
  readonly type: T
}

export const isOfType = <A extends B, B extends TypeOf = TypeOf, K = A['type']>(
  item: B,
  type: K
): item is A => item.type === type
