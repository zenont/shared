import { base64EncArr } from './browser-util'
import { strToUTF8Arr, base64DecToArr, UTF8ArrToStr } from './browser-utf8'
import { isBrowser, isWebWorker } from '../env'

export const fromBase64 = (value: string) => {
  if (isBrowser() || isWebWorker()) {
    const output = base64DecToArr(value)
    return UTF8ArrToStr(output)
  }

  return Buffer.from(`${value}`, 'base64').toString('utf8')
}

export const toBase64 = (value: string) => {
  if (isBrowser() || isWebWorker()) {
    const output = strToUTF8Arr(value)
    return base64EncArr(output)
  }
  return Buffer.from(value, 'utf8').toString('base64')
}
