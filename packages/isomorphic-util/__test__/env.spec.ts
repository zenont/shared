import { isNode, isBrowser, isWebWorker } from '../src'

const ORIGINAL_GLOBAL = global

describe('env', () => {
  describe('type', () => {
    beforeEach(() => {
      jest.resetModules()
    })

    afterEach(() => {
      global = ORIGINAL_GLOBAL
    })

    it('should detect node', () => {
      expect(isNode()).toBe(true)
      expect(isBrowser()).toBe(false)
      expect(isWebWorker()).toBe(false)
    })

    it('should detect browser', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(global as any).window = {}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(global as any).document = {}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(global as any).process = undefined

      expect(isNode()).toBe(false)
      expect(isBrowser()).toBe(true)
      expect(isWebWorker()).toBe(false)
    })

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
})
