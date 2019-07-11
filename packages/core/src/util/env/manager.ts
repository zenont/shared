import { NodeEnv, KnownEnvKey } from './types'
import {
  isNodeEnvironment,
  isDebug,
  hasEnvVar,
  getEnvVar,
  setEnvVar
} from './util'

export class NodeProcessEnvMgr<
  T extends string = NodeEnv,
  K extends KnownEnvKey = KnownEnvKey
> {
  has(key: K) {
    return hasEnvVar(key)
  }

  get(key: K): string | undefined {
    return getEnvVar(key)
  }

  set(key: K, value: string): void {
    setEnvVar(key, value)
  }

  isDebug() {
    return isDebug()
  }

  isEnv(envName: T) {
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

export function provideEnv<
  T extends string = NodeEnv,
  K extends KnownEnvKey = KnownEnvKey
>() {
  return new NodeProcessEnvMgr<T, K>()
}
