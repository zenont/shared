import React, { FunctionComponent, DetailedHTMLProps } from 'react'
import styled from '@emotion/styled'

type P = DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>

type C = FunctionComponent<P>

const Layout = styled.button`
  width: 50px;
`

export const Button: C = props => {
  const { children, ...rest } = props
  return <Layout {...rest}>{children}</Layout>
}

export default Button
