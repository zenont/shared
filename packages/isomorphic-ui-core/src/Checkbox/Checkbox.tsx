import React, {
  FunctionComponent,
  PropsWithChildren,
  ChangeEventHandler,
  useEffect,
  useCallback,
  DetailedHTMLProps,
  InputHTMLAttributes
} from 'react'
import { Layout, Input, Label } from './styles'

let idCounter = 0

interface P
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  readonly id?: string
  readonly checked?: boolean
  readonly onChange?: ChangeEventHandler<HTMLInputElement>
  readonly onUnchecked?: ChangeEventHandler<HTMLInputElement>
  readonly onChecked?: ChangeEventHandler<HTMLInputElement>
}

type C = FunctionComponent<PropsWithChildren<P>>

export const Checkbox: C = props => {
  const {
    children,
    id,
    checked,
    onChange,
    onChecked,
    onUnchecked,
    ...rest
  } = props

  useEffect(() => {
    idCounter++
    return () => {
      idCounter--
    }
  })

  const elemId = id || `checkbox-${idCounter}`

  const onChangeHandler = useCallback<ChangeEventHandler<HTMLInputElement>>(
    args => {
      const target = args.target as HTMLInputElement

      if (onChange) {
        onChange(args)
      }

      if (target.checked === true && onChecked != null) {
        onChecked(args)
      }

      if (!target.checked && onUnchecked != null) {
        onUnchecked(args)
      }
    },
    [onChange, onChecked, onUnchecked]
  )

  return (
    <Layout>
      <Input
        {...rest}
        id={elemId}
        type="checkbox"
        checked={checked}
        onChange={onChangeHandler}
      />
      <Label htmlFor={elemId}>{children}</Label>
    </Layout>
  )
}

export default Checkbox
