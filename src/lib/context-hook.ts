import React from 'react'
import { BaseUpdaters, CustomContext } from './types'

export const getUseContext = <Store, Updaters extends BaseUpdaters>(
  Context: CustomContext<Store, Updaters>
) => {
  return () => {
    const { store, updaters } = React.useContext(Context)
    return { ...store, ...updaters }
  }
}
