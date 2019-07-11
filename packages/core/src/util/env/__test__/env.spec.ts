import {
  isDebug,
  getProcess,
  getProcessEnvOrInit,
  isNode,
  isBrowser,
  isWebWorker,
  isNodeEnvironment,
  hasEnvVar,
  setEnvVar,
  getEnvVar,
  getEnvVarOrThrow
} from '../util'

describe('getProcess', () => {
  const ORIGINAL_PRC = process
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(() => {
    process = ORIGINAL_PRC
  })

  it('should return process', () => {
    expect(getProcess()).toBeTruthy()
  })

  it('should not return undefined process', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(process as any) = undefined
    expect(getProcess()).toBeFalsy()
  })

  it('should not return null process', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(process as any) = null
    expect(getProcess()).toBeFalsy()
  })
})

describe('getProcessEnvOrInit', () => {
  const ORIGINAL_ENV = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = { __MOCK: 'I AM MOCK!' }
  })

  afterEach(() => {
    process.env = ORIGINAL_ENV
  })

  it('should get existing process.env', () => {
    expect(getProcessEnvOrInit()).toBeTruthy()
  })

  it('should not get existing undefined process.env', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(process.env as any) = undefined
    expect(getProcessEnvOrInit()).toBeFalsy()
  })

  it('should not get existing null process.env', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(process.env as any) = null
    expect(getProcessEnvOrInit()).toBeFalsy()
  })
})

describe('env type', () => {
  it('should detect node', () => {
    expect(isNode()).toBe(true)
  })

  it('should detect browser', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).window = {}
    expect(isBrowser()).toBe(true)
  })

  it('should detect web worker', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ;(global as any).self = {}
    expect(isWebWorker()).toBe(true)
  })
})

describe('isNodeEnvironment', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { __MOCK: 'I AM MOCK!' }
  })

  afterEach(() => {
    process.env = ORIGINAL_ENV
  })

  it('should match NODE_ENV', () => {
    const NODE_ENV = 'MOCK_ENV'
    process.env = { NODE_ENV }
    expect(isNodeEnvironment(NODE_ENV)).toBe(true)
  })

  it('should not match NODE_ENV', () => {
    const NODE_ENV = 'MOCK_ENV'
    process.env = { NODE_ENV }
    expect(isNodeEnvironment('FAKE_ENV')).toBe(false)
  })
})

describe('hasEnvVar', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { __MOCK: 'I AM MOCK!' }
  })

  afterEach(() => {
    process.env = ORIGINAL_ENV
  })

  it('should find env var', () => {
    process.env = { FAKE_ME: 'SO_FAKE' }
    expect(hasEnvVar('FAKE_ME')).toBe(true)
  })

  it('should not find undefined env var', () => {
    process.env = { FAKE_ME: undefined }
    expect(hasEnvVar('FAKE_ME')).toBe(false)
  })

  it('should not find null env var', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    process.env = { FAKE_ME: null as any }
    expect(hasEnvVar('FAKE_ME')).toBe(false)
  })
})

describe('setEnvVar', () => {
  const ORIGINAL = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = {}
  })

  afterEach(() => {
    process.env = ORIGINAL
  })

  it('should set env var', () => {
    setEnvVar('LOL', 'LOL_ME')
    expect(process.env).toMatchSnapshot()
  })
})

describe('getEnvVar', () => {
  const ORIGINAL = process.env
  beforeEach(() => {
    jest.resetModules()
    process.env = {}
  })

  afterEach(() => {
    process.env = ORIGINAL
  })

  it('should get env var', () => {
    process.env = { LOL: 'LOLZ' }
    expect(getEnvVar('LOL')).toMatchSnapshot()
  })

  it('should not get env var', () => {
    process.env = {}
    expect(getEnvVar('LOL')).toBe(undefined)
  })

  it('should default env var', () => {
    process.env = {}
    expect(getEnvVar('LOL', 'LOLZ')).toMatchSnapshot()
  })

  it('should find env and not throw', () => {
    process.env = { LOL: 'LOLZ' }
    expect(getEnvVarOrThrow('LOL')).toMatchSnapshot()
  })

  it('should not find env and throw', () => {
    expect(() => getEnvVarOrThrow('LOL')).toThrow()
  })
})

describe('isDebug', () => {
  const ORIGINAL_ENV = process.env

  beforeEach(() => {
    jest.resetModules()
    process.env = { ...ORIGINAL_ENV }
  })

  afterEach(() => {
    process.env = ORIGINAL_ENV
  })

  it("should detect DEBUG with 'true'", () => {
    process.env.DEBUG = 'true'
    expect(isDebug()).toBe(true)
  })

  it("should detect DEBUG with '1'", () => {
    process.env.DEBUG = '1'
    expect(isDebug()).toBe(true)
  })

  it("should not detect DEBUG with 'undefined'", () => {
    process.env.DEBUG = undefined
    expect(isDebug()).toBe(false)
  })

  it("should not detect DEBUG with 'false'", () => {
    process.env.DEBUG = 'false'
    expect(isDebug()).toBe(false)
  })

  it("should not detect DEBUG with '0'", () => {
    process.env.DEBUG = '0'
    expect(isDebug()).toBe(false)
  })
})
