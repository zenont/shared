import { provideEnv } from '../src'

const ORIGINAL_PRC = process

describe('env', () => {
  describe('manager', () => {
    beforeEach(() => {
      jest.resetModules()
    })

    afterEach(() => {
      process = ORIGINAL_PRC
    })

    it('should get env var', () => {
      const NODE_PATH = 'FAKE VALUE'
      process.env.NODE_PATH = NODE_PATH
      expect(provideEnv().get('NODE_PATH')).toBe(NODE_PATH)
    })

    it('should not get env var', () => {
      expect(provideEnv().get('AWS_SECRET_ACCESS_KEY')).toBeUndefined()
    })

    it('should get default env var', () => {
      const AWS_SECRET_ACCESS_KEY = 'FAKE VALUE'
      provideEnv().isEnv('development')
      expect(
        provideEnv().get('AWS_SECRET_ACCESS_KEY', AWS_SECRET_ACCESS_KEY)
      ).toBe(AWS_SECRET_ACCESS_KEY)
    })

    it('should getOrThrow and throw', () => {
      expect(() => provideEnv().getOrThrow('SOME_VAR')).toThrowError()
    })

    it('should getOrThrow and not throw', () => {
      const SOME_VAR = 'SOME_VAR'
      process.env.SOME_VAR = SOME_VAR
      expect(provideEnv().getOrThrow('SOME_VAR')).toBe(SOME_VAR)
    })
  })
})
