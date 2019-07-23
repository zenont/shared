import { base64EncArr } from './browser-util'
import { strToUTF8Arr, base64DecToArr, UTF8ArrToStr } from './browser-utf8'
import { isBrowser, isWebWorker } from '../env'

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

export const fromBase64 = (value: string, encoding?: Encoding) => {
  if (isBrowser() || isWebWorker()) {
    const aMyUTF8Output = base64DecToArr(value)
    return UTF8ArrToStr(aMyUTF8Output)
  }

  return Buffer.from(`${value}`, 'base64').toString(encoding)
}

export const toBase64 = (value: string, encoding?: Encoding) => {
  if (isBrowser() || isWebWorker()) {
    const aMyUTF8Input = strToUTF8Arr(value)
    return base64EncArr(aMyUTF8Input)
  }
  return Buffer.from(value, encoding).toString('base64')
}
