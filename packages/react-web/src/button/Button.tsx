import React, { FunctionComponent, PropsWithChildren } from 'react'

type C = FunctionComponent<PropsWithChildren<{}>>

export const Button: C = props => {
  const { children, ...rest } = props
  return <button {...rest}>{children}</button>
}

export default Button
