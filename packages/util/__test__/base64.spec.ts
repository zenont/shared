import { toBase64, fromBase64 } from '../src'

const SAMPLE_TEXT =
  'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...'
const BASE64_SAMPLE_TEXT =
  'TmVxdWUgcG9ycm8gcXVpc3F1YW0gZXN0IHF1aSBkb2xvcmVtIGlwc3VtIHF1aWEgZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyLCBhZGlwaXNjaSB2ZWxpdC4uLg=='

describe('base64', () => {
  it('should encode to base64', () => {
    const value = SAMPLE_TEXT
    expect(toBase64(value)).toBe(BASE64_SAMPLE_TEXT)
  })

  it('should decode base64', () => {
    const value = BASE64_SAMPLE_TEXT
    expect(fromBase64(value)).toBe(SAMPLE_TEXT)
  })
})
