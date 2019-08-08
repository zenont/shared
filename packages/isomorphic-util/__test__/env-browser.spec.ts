/**
 * @jest-environment jsdom
 */
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

    it('should detect browser', () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(global as any).process = undefined

      expect(isNode()).toBe(false)
      expect(isBrowser()).toBe(true)
      expect(isWebWorker()).toBe(false)
    })
  })
})
