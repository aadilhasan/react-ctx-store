import React from 'react'
import { getConsumerClass } from './consumer'
import { getProviderClass } from './provider'
import { BaseUpdaters } from './types'
import { getConnect } from './connect'
import { getUseContext } from './context-hook'

export const createContext = <
  Store extends {},
  Updaters extends BaseUpdaters<Store>
>(
  store: Store,
  updaters: Updaters
) => {
  const Context = React.createContext({
    store: { ...store },
    updaters: { ...updaters }
  })
  const Consumer = getConsumerClass(Context)

  return {
    Consumer,
    Provider: getProviderClass(store, updaters, Context),
    connect: getConnect<Store, Updaters>(Consumer),
    useStore: getUseContext<Store, Updaters>(Context),
    _context: Context
  }
}
