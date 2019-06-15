import AWS from 'aws-sdk'

export abstract class BaseS3Manager {
  protected s3: AWS.S3
  constructor(options?: AWS.S3.ClientConfiguration) {
    this.s3 = new AWS.S3(options)
  }
}

export abstract class BaseS3OperationManager {
  protected getObjectAsync: (
    input: AWS.S3.GetObjectRequest
  ) => Promise<AWS.S3.GetObjectOutput>
  protected pubObjectAsync: (
    input: AWS.S3.PutObjectRequest
  ) => Promise<AWS.S3.PutObjectOutput>
  protected deleteObjectAsync: (
    input: AWS.S3.DeleteObjectRequest
  ) => Promise<AWS.S3.DeleteObjectOutput>

  constructor(protected s3: AWS.S3) {
    this.getObjectAsync = input =>
      new Promise((resolve, reject) => {
        this.s3.getObject(input, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })

    this.pubObjectAsync = input =>
      new Promise((resolve, reject) => {
        this.s3.putObject(input, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })

    this.deleteObjectAsync = input =>
      new Promise((resolve, reject) => {
        this.s3.deleteObject(input, (err, data) => {
          if (err) {
            reject(err)
          } else {
            resolve(data)
          }
        })
      })
  }
}

export class S3BucketManager extends BaseS3OperationManager {
  constructor(s3: AWS.S3, private bucket: string) {
    super(s3)
  }

  async getObject(key: string) {
    return await this.getObjectAsync({ Key: key, Bucket: this.bucket })
  }
}
