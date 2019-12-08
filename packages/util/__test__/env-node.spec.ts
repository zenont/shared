/**
 * @jest-environment node
 */
import { isNode, isBrowser, isWebWorker } from '../src'

describe('env', () => {
  it('should detect node', () => {
    expect(isNode()).toBe(true)
    expect(isBrowser()).toBe(false)
    expect(isWebWorker()).toBe(false)
  })
})
