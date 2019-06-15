import {
  getProcessEnv,
  isDebug,
  isEnv,
  isDevelopment,
  isTest,
  isStaging,
  isProduction,
  hasVariable,
  getEnvVar,
  getEnvVarOrThrow
} from '../src'

describe('env', () => {
  const ORIG_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    delete process.env
  })

  afterEach(() => {
    process.env = ORIG_ENV
  })

  it('should get env var', () => {
    process.env = {
      NODE_ENV: 'production'
    }
    const result = getEnvVar('NODE_ENV')
    expect(result).toMatchSnapshot()
    expect(getEnvVarOrThrow('NODE_ENV')).toMatchSnapshot()
  })

  it('should not get env var', () => {
    process.env = {}
    const result = getEnvVar('NODE_ENV')
    expect(result).toMatchSnapshot()
    expect(() => getEnvVarOrThrow('NODE_ENV')).toThrow()
  })

  it('should get process env', () => {
    process.env = {
      NODE_ENV: 'production'
    }
    const result = getProcessEnv()
    expect(result).toMatchSnapshot()
  })

  it('should not get process env', () => {
    const result = getProcessEnv()
    expect(result).toMatchSnapshot()
  })

  it('should get process debug', () => {
    process.env = {
      DEBUG: 'true'
    }
    const result = isDebug()
    expect(result).toMatchSnapshot()
  })

  it('should not get process debug', () => {
    process.env = {
      DEBUG: 'false'
    }
    const result = isDebug()
    expect(result).toMatchSnapshot()
  })

  it('should get NODE_ENV development', () => {
    const NODE_ENV = 'development'
    process.env = {
      NODE_ENV
    }

    expect(isEnv(NODE_ENV)).toBe(true)
    expect(isDevelopment()).toBe(true)
    expect(isTest()).toBe(false)
    expect(isStaging()).toBe(false)
    expect(isProduction()).toBe(false)
  })

  it('should get NODE_ENV test', () => {
    const NODE_ENV = 'test'
    process.env = {
      NODE_ENV
    }

    expect(isEnv(NODE_ENV)).toBe(true)
    expect(isDevelopment()).toBe(false)
    expect(isTest()).toBe(true)
    expect(isStaging()).toBe(false)
    expect(isProduction()).toBe(false)
  })

  it('should get NODE_ENV staging', () => {
    const NODE_ENV = 'staging'
    process.env = {
      NODE_ENV
    }

    expect(isEnv(NODE_ENV)).toBe(true)
    expect(isDevelopment()).toBe(false)
    expect(isTest()).toBe(false)
    expect(isStaging()).toBe(true)
    expect(isProduction()).toBe(false)
  })

  it('should get NODE_ENV production', () => {
    const NODE_ENV = 'production'
    process.env = {
      NODE_ENV
    }

    expect(isEnv(NODE_ENV)).toBe(true)
    expect(isDevelopment()).toBe(false)
    expect(isTest()).toBe(false)
    expect(isStaging()).toBe(false)
    expect(isProduction()).toBe(true)
  })

  it('should detect variable ', () => {
    const NODE_ENV = 'production'
    process.env = {
      NODE_ENV
    }

    expect(hasVariable('NODE_ENV')).toBe(true)
  })

  it('should not detect variable ', () => {
    process.env = {}

    expect(hasVariable('NODE_ENV')).toBe(false)
  })
})
