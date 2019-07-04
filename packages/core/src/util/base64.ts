export const fromBase64 = (value: string) =>
  new Buffer(`${value}`, 'base64').toString('utf8')

export const toBase64 = (value: string) => Buffer.from(value).toString('base64')
