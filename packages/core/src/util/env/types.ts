export type AWSKnownEnvKey =
  | '_HANDLER'
  | 'AWS_REGION'
  | 'AWS_EXECUTION_ENV'
  | 'AWS_LAMBDA_FUNCTION_NAME'
  | 'AWS_LAMBDA_FUNCTION_MEMORY_SIZE'
  | 'AWS_LAMBDA_FUNCTION_VERSION'
  | 'AWS_LAMBDA_LOG_GROUP_NAME'
  | 'AWS_LAMBDA_LOG_STREAM_NAME'
  | 'AWS_ACCESS_KEY_ID'
  | 'AWS_SECRET_ACCESS_KEY'
  | 'AWS_SESSION_TOKEN'
  | 'LAMBDA_TASK_ROOT'
  | 'LAMBDA_RUNTIME_DIR'
  | 'LD_LIBRARY_PATH'
  | 'AWS_LAMBDA_RUNTIME_API'

export type NodeKnownEnvKey =
  | 'NODE_ENV'
  | 'DEBUG'
  | 'PATH'
  | 'LANG'
  | 'TZ'
  | 'NODE_PATH'

export type KnownEnvKey = NodeKnownEnvKey | AWSKnownEnvKey

export type NodeEnv = 'development' | 'test' | 'staging' | 'production'
export type ProcessEnv = NodeEnv
