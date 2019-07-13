import React, { FunctionComponent, PropsWithChildren } from 'react'

type P = {}
type C = FunctionComponent<PropsWithChildren<P>>

export const Button: C = props => {
  const { children, ...rest } = props
  return <button {...rest}>{children}</button>
}
