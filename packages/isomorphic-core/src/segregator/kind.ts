// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Kind<T = any> {
  readonly kind: T
}

export const isOfKind = <A extends B, B extends Kind = Kind, K = A['kind']>(
  item: B,
  kind: K
): item is A => item.kind === kind
