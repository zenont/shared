import { isNode, isBrowser, isWebWorker } from '../src'

describe('env', () => {
  it('should detect web worker', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).window = undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).document = undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).process = undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).self = {
      constructor: {
        name: 'DedicatedWorkerGlobalScope'
      }
    }

    expect(isNode()).toBe(false)
    expect(isBrowser()).toBe(false)
    expect(isWebWorker()).toBe(true)
  })
})
