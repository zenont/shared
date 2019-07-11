import { Kind, isOfKind } from '../kind'

describe('segregator', () => {
  it('should segregate kind', () => {
    type A = Kind<'A'> & { a: string }
    type B = Kind<'B'> & { b: string }
    type AB = A | B
    const a: A = {
      kind: 'A',
      a: 'a'
    }
    const b: B = {
      kind: 'B',
      b: 'b'
    }

    const AA = a
    const BB = b
    expect(isOfKind<A>(AA, 'A')).toBe(true)
    expect(isOfKind<B>(AA, 'B')).toBe(false)
    expect(isOfKind<B>(BB, 'B')).toBe(true)
    expect(isOfKind<A>(BB, 'A')).toBe(false)
  })
})
