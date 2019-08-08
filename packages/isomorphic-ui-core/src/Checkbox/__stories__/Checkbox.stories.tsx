import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean } from '@storybook/addon-knobs'
import { action } from '@storybook/addon-actions'
import { State, Store, StateDecorator } from '@sambego/storybook-state'
import { Checkbox } from '../Checkbox'

const store = new Store({
  checked: false
})

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .addDecorator(StateDecorator(store))
  .add('default view', () => {
    return (
      <Checkbox
        onChange={action('onChange')}
        onChecked={() => store.set({ checked: true })}
        onUnchecked={() => store.set({ checked: false })}
      >
        Checkbox Label
      </Checkbox>
    )
  })
