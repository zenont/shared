export type Encoding =
  | 'ascii'
  | 'utf8'
  | 'utf-8'
  | 'utf16le'
  | 'ucs2'
  | 'ucs-2'
  | 'base64'
  | 'latin1'
  | 'binary'
  | 'hex'

export const fromBase64 = (value: string, encoding?: Encoding) =>
  Buffer.from(`${value}`, 'base64').toString(encoding)

export const toBase64 = (value: string, encoding?: Encoding) =>
  Buffer.from(value, encoding).toString('base64')
