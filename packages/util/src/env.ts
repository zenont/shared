export function getProcessEnv() {
  if (typeof process !== 'undefined') {
    return process.env
  }
  return undefined
}

export const isDebug = () => {
  const env = getProcessEnv()
  return env ? env.DEBUG === 'true' : false
}

export const isEnv = (env: string) => process.env.NODE_ENV === env

export const isDevelopment = () => isEnv('development')

export const isTest = () => isEnv('test')

export const isStaging = () => isEnv('staging')

export const isProduction = () => isEnv('production')

export function hasVariable(key: string): boolean {
  const env = getProcessEnv()
  return env ? env[key] != null : false
}

export function getEnvVar(key: string): string | undefined
export function getEnvVar(key: string, defaultValue: string): string
export function getEnvVar(
  key: string,
  defaultValue?: string
): string | undefined
export function getEnvVar(
  key: string,
  defaultValue?: string
): string | undefined {
  const env = getProcessEnv()
  return (env && env[key]) || defaultValue
}

export function getEnvVarOrThrow(key: string, throwOnBlank = true): string {
  const value = getEnvVar(key)
  if (!value || (throwOnBlank === true && value.trim() === ''))
    throw new Error(`Environment variable ${key} is null, blank or undefined`)

  return value
}
