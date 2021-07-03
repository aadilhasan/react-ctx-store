import React from 'react'
import { getConsumerClass } from './consumer'
import { getProviderClass } from './provider'
import { BaseUpdaters } from './types'
import { getConnect } from './connect'

export const createContext = <
  State extends {},
  Updaters extends BaseUpdaters<State>
>(
  state: State,
  updaters: Updaters
) => {
  const Context = React.createContext({
    state: { ...state },
    updaters: { ...updaters }
  })
  const Consumer = getConsumerClass(Context)

  return {
    Consumer,
    Provider: getProviderClass(state, updaters, Context),
    connect: getConnect<State, Updaters>(Consumer),
    _context: Context
  }
}
