import * as React from 'react'
import { BaseUpdaters, CustomContext } from './types'

export const getProviderClass = <State, Updaters extends BaseUpdaters>(
  state: State,
  updaters: Updaters,
  Context: CustomContext<State, Updaters>
) => {
  return class Provider extends React.PureComponent {
    state: State = state
    updaters: any = {}
    constructor(props: any) {
      super(props)
      this.setUpdaters(updaters)
    }

    setUpdaters = (updaters: BaseUpdaters) => {
      for (const key in updaters) {
        this.updaters[key] = (...args: any) => {
          // log action if required
          this.setState({ ...updaters[key](this.state, ...args) })
        }
      }
    }

    render() {
      return (
        <Context.Provider
          value={{ state: this.state, updaters: this.updaters }}
        >
          {this.props.children}
        </Context.Provider>
      )
    }
  }
}
