import { NodeEnv } from './types'
import {
  isNodeEnv,
  isDebug,
  hasEnvVar,
  getEnvVar,
  getEnvVarOrThrow,
  setEnvVar
} from './util'

export class NodeProcessEnvMgr {
  has(key: string) {
    return hasEnvVar(key)
  }

  get(key: string, defaultValue: string): string
  get(key: string, defaultValue?: string): string | undefined
  get(key: string, defaultValue?: string) {
    return getEnvVar(key, defaultValue)
  }

  getOrThrow(key: string) {
    return getEnvVarOrThrow(key)
  }

  set(key: string, value: string): void {
    setEnvVar(key, value)
  }

  isDebug() {
    return isDebug()
  }

  isNodeEnv(envName: NodeEnv | string) {
    return isNodeEnv(envName)
  }

  isDevelopment() {
    return isNodeEnv('development')
  }

  isTest() {
    return isNodeEnv('test')
  }

  isStaging() {
    return isNodeEnv('staging')
  }

  isProduction() {
    return isNodeEnv('production')
  }
}

export function provideEnv() {
  return new NodeProcessEnvMgr()
}
