import { provideEnv } from '../manager'

describe('provideEnv', () => {
  const ORIGINAL = process
  beforeEach(() => {
    jest.resetModules()
  })

  afterEach(() => {
    process = ORIGINAL
  })

  it('should return process', () => {
    process.env = { NODE_ENV: 'LOLZ' }
    const env = provideEnv()
    expect(env.get('NODE_ENV')).toMatchSnapshot()
  })
})
