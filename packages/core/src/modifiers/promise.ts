import { Maybe } from './maybe'

export type PromiseLike<T = void> = T | Promise<T>

export const isPromise = <T = void>(
  promiseLike: Maybe<PromiseLike<T>>
): promiseLike is Promise<T> =>
  promiseLike != null &&
  (promiseLike as Promise<T>).then !== undefined &&
  typeof (promiseLike as Promise<T>).then === 'function' &&
  (promiseLike as Promise<T>).catch !== undefined &&
  typeof (promiseLike as Promise<T>).catch === 'function' &&
  (promiseLike as Promise<T>).finally !== undefined &&
  typeof (promiseLike as Promise<T>).finally === 'function'
