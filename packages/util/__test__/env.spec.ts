import {
  getProcessEnv,
  isDebug,
  isEnv,
  isDevelopment,
  isTest,
  isStaging,
  isProduction
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

    expect(isEnv(NODE_ENV))
    expect(isDevelopment()).toMatchSnapshot()
    expect(isTest()).toMatchSnapshot()
    expect(isStaging()).toMatchSnapshot()
    expect(isProduction()).toMatchSnapshot()
  })

  it('should get NODE_ENV test', () => {
    const NODE_ENV = 'test'
    process.env = {
      NODE_ENV
    }

    expect(isEnv(NODE_ENV))
    expect(isDevelopment()).toMatchSnapshot()
    expect(isTest()).toMatchSnapshot()
    expect(isStaging()).toMatchSnapshot()
    expect(isProduction()).toMatchSnapshot()
  })

  it('should get NODE_ENV staging', () => {
    const NODE_ENV = 'staging'
    process.env = {
      NODE_ENV
    }

    expect(isEnv(NODE_ENV))
    expect(isDevelopment()).toMatchSnapshot()
    expect(isTest()).toMatchSnapshot()
    expect(isStaging()).toMatchSnapshot()
    expect(isProduction()).toMatchSnapshot()
  })

  it('should get NODE_ENV production', () => {
    const NODE_ENV = 'production'
    process.env = {
      NODE_ENV
    }

    expect(isEnv(NODE_ENV))
    expect(isDevelopment()).toMatchSnapshot()
    expect(isTest()).toMatchSnapshot()
    expect(isStaging()).toMatchSnapshot()
    expect(isProduction()).toMatchSnapshot()
  })
})
