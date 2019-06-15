/* eslint-disable @typescript-eslint/no-explicit-any */
import createS3 from '../src'

const mockedGetObject = jest.fn()
const mockedPutObject = jest.fn()
jest.mock('aws-sdk', () => ({
  __esModule: true,
  default: {
    S3: class S3 {
      putObject(params: any, cb: any) {
        mockedPutObject(params, cb)
        cb(undefined, {
          VersionId: `Fake VersionId: ${JSON.stringify(params.Body)}`
        })
      }
      getObject(params: any, cb: any) {
        mockedGetObject(params, cb)
        cb(undefined, { Body: JSON.stringify(params.Key) })
      }
    }
  }
}))

describe('s3', () => {
  it('should get JSON', async () => {
    const s3 = createS3()
    const result = await s3.bucket('holos-s3').getJSON('my-test')
    expect(result).toMatchSnapshot()
  })

  it('should put JSON', async () => {
    const s3 = createS3()
    const result = await s3.bucket('holos-s3').putJSON('my-test', { test: 1 })
    expect(result).toMatchSnapshot()
  })

  it('should get base64', async () => {
    const s3 = createS3()
    const result = await s3.bucket('holos-s3').getBase64('ImVuY29kZW1lIg==')
    expect(result).toMatchSnapshot()
  })

  it('should put base64', async () => {
    const s3 = createS3()
    const result = await s3.bucket('holos-s3').putBase64('my-test', 'encodeme')
    expect(result).toMatchSnapshot()
  })
})
