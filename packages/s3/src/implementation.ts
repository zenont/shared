import AWS from 'aws-sdk'
import { toBase64, fromBase64 } from '@ztr/util'
import { BaseS3OperationManager, BaseS3Manager } from './abstract'

export class S3BucketManager extends BaseS3OperationManager {
  constructor(s3: AWS.S3, private bucket: string) {
    super(s3)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async getJSON<T = any>(key: string) {
    const output = await this.getObjectAsync({ Key: key, Bucket: this.bucket })
    if (!output.Body) return undefined
    return JSON.parse(`${output.Body}`) as T
  }

  async putJSON<T>(key: string, content: T) {
    const output = await this.pubObjectAsync({
      Key: key,
      Bucket: this.bucket,
      Body: JSON.stringify(content)
    })
    return output.VersionId
  }

  async delete(key: string) {
    const output = await this.deleteObjectAsync({
      Key: key,
      Bucket: this.bucket
    })

    return output.DeleteMarker
  }

  async getBase64(key: string) {
    const output = await this.getObjectAsync({ Key: key, Bucket: this.bucket })
    if (!output.Body) return undefined
    return fromBase64(`${output.Body}`)
  }

  async putBase64<T>(key: string, content: T) {
    const output = await this.pubObjectAsync({
      Key: key,
      Bucket: this.bucket,
      Body: toBase64(JSON.stringify(content))
    })
    return output.VersionId
  }
}

export class S3Manager extends BaseS3Manager {
  constructor(options?: AWS.S3.ClientConfiguration) {
    super(options)
  }
  bucket(name: string) {
    return new S3BucketManager(this.s3, name)
  }
}

export default (options?: AWS.S3.ClientConfiguration) => new S3Manager(options)
