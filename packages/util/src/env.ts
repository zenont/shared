import process from 'process'

export type NodeEnvironment = 'development' | 'test' | 'staging' | 'production'

export const isDebug = () => !!process.env.DEBUG

export const isNodeEnv = (env: NodeEnvironment) => process.env.NODE_ENV === env

export const isDevelopment = () => isNodeEnv('development')

export const isProduction = () => isNodeEnv('production')

export function getEnvVariable(key: string): string | undefined
export function getEnvVariable(key: string, defaultValue: string): string
export function getEnvVariable(
  key: string,
  defaultValue?: string
): string | undefined
export function getEnvVariable(
  key: string,
  defaultValue?: string
): string | undefined {
  return process.env[key] || defaultValue
}

export function getEnvVariableOrThrow(
  key: string,
  defaultValue?: string
): string {
  const value = getEnvVariable(key, defaultValue)
  if (!value || value.length <= 0)
    throw new Error(`Environment variable ${key} is null, blank or undefined`)

  return value
}
