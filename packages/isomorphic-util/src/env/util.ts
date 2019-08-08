export function isBrowser() {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

export function isNode() {
  return (
    typeof global !== 'undefined' &&
    typeof global.process !== 'undefined' &&
    typeof global.process.versions !== 'undefined' &&
    typeof global.process.versions.node !== 'undefined'
  )
}

export function isWebWorker() {
  return (
    typeof self !== 'undefined' &&
    typeof self === 'object' &&
    self.constructor &&
    self.constructor.name === 'DedicatedWorkerGlobalScope'
  )
}

export function getProcess(): NodeJS.Process | undefined {
  const p = process
  return typeof p === 'undefined' ? undefined : p
}

export function getProcessEnvOrInit(): NodeJS.ProcessEnv {
  const prc = getProcess()
  if (prc == null) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    globalThis.process = { env: {} } as any
  }

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return prc!.env
}

/**
 * Checks if NODE_ENV equals a specific string.
 *
 * @export
 * @param {string} envName The environment name to match (i.e. development, test or production).
 * @returns {boolean}
 */
export function isNodeEnvironment(envName: string): boolean {
  const env = getProcessEnvOrInit()
  return env.NODE_ENV === envName
}

export const isDebug = () => {
  const env = getProcessEnvOrInit()
  return env.DEBUG === 'true' || env.DEBUG === '1'
}

export function hasEnvVar(key: string): boolean {
  const env = getProcessEnvOrInit()
  return env[key] != null
}

export function setEnvVar(key: string, value: string): void {
  const env = getProcessEnvOrInit()
  env[key] = value
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
  const env = getProcessEnvOrInit()
  return env[key] || defaultValue
}

export function getEnvVarOrThrow(key: string, throwOnBlank = true): string {
  const value = getEnvVar(key)
  if (!value || (throwOnBlank === true && value.trim() === ''))
    throw new Error(`Environment variable ${key} is null, blank or undefined`)

  return value
}
