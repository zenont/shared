import { NodeEnv } from './types'
import {
  isNodeEnvironment,
  isDebug,
  hasEnvVar,
  getEnvVar,
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

  set(key: string, value: string): void {
    setEnvVar(key, value)
  }

  isDebug() {
    return isDebug()
  }

  isEnv(envName: NodeEnv | string) {
    return isNodeEnvironment(envName)
  }

  isDevelopment() {
    return isNodeEnvironment('development')
  }

  isTest() {
    return isNodeEnvironment('test')
  }

  isStaging() {
    return isNodeEnvironment('staging')
  }

  isProduction() {
    return isNodeEnvironment('production')
  }
}

export function provideEnv() {
  return new NodeProcessEnvMgr()
}
