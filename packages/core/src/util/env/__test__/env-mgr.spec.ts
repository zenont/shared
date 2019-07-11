import { provideEnv } from '../manager'
import { ProcessEnv } from '../types'

describe('NodeProcessEnvMgr', () => {
  const ORIGINAL = process
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(() => {
    process = ORIGINAL
  })

  it('should return process', () => {
    const NODE_ENV = 'LOLZ'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.get('NODE_ENV')).toBe(NODE_ENV)
  })

  it('should have env var', () => {
    const NODE_ENV = 'LOLZ'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.has('NODE_ENV')).toBe(true)
  })

  it('should not have env var', () => {
    const NODE_ENV = undefined
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.has('NODE_ENV')).toBe(false)
  })

  it('should be DEBUG', () => {
    const DEBUG = 'true'
    process.env = { DEBUG }
    const env = provideEnv()
    expect(env.isDebug()).toBe(true)
  })

  it('should not be DEBUG', () => {
    const DEBUG = 'false'
    process.env = { DEBUG }
    const env = provideEnv()
    expect(env.isDebug()).toBe(false)
  })

  it('should not be DEBUG null', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const DEBUG = null as any
    process.env = { DEBUG }
    const env = provideEnv()
    expect(env.isDebug()).toBe(false)
  })

  it('should not be DEBUG undefined', () => {
    const DEBUG = undefined
    process.env = { DEBUG }
    const env = provideEnv()
    expect(env.isDebug()).toBe(false)
  })

  it('should be NODE_ENV development', () => {
    const NODE_ENV = 'development'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.isDevelopment()).toBe(true)
  })

  it('should not be NODE_ENV development', () => {
    const NODE_ENV = 'fake_env'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.isDevelopment()).toBe(false)
  })

  it('should be NODE_ENV test', () => {
    const NODE_ENV = 'test'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.isTest()).toBe(true)
  })

  it('should not be NODE_ENV test', () => {
    const NODE_ENV = 'fake_env'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.isTest()).toBe(false)
  })

  it('should be NODE_ENV staging', () => {
    const NODE_ENV = 'staging'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.isStaging()).toBe(true)
  })

  it('should not be NODE_ENV staging', () => {
    const NODE_ENV = 'fake_env'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.isStaging()).toBe(false)
  })

  it('should be NODE_ENV production', () => {
    const NODE_ENV = 'production'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.isProduction()).toBe(true)
  })

  it('should not be NODE_ENV production', () => {
    const NODE_ENV = 'fake_env'
    process.env = { NODE_ENV }
    const env = provideEnv()
    expect(env.isProduction()).toBe(false)
  })

  it('should be NODE_ENV custom', () => {
    type CustomEnv = ProcessEnv | 'custom'
    const NODE_ENV = 'custom'
    process.env = { NODE_ENV }
    const env = provideEnv<CustomEnv>()
    expect(env.isEnv('custom')).toBe(true)
  })

  it('should not be NODE_ENV custom', () => {
    type CustomEnv = ProcessEnv | 'custom'
    const NODE_ENV = 'fake_env'
    process.env = { NODE_ENV }
    const env = provideEnv<CustomEnv>()
    expect(env.isEnv('custom')).toBe(false)
  })

  it('should set env key', () => {
    const env = provideEnv<ProcessEnv, 'MY_ENV_VAR' | 'MY_ENV_VAR1'>()
    env.set('MY_ENV_VAR', 'my_value')
    expect(env.get('MY_ENV_VAR')).toBe('my_value')
    expect(env.get('MY_ENV_VAR1')).toBe(undefined)
  })
})
