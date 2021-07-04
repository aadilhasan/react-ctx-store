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
        this.updaters[key] = async (...args: any) => {
          // log action if required
          let res = updaters[key](this.state, ...args)
          if (res instanceof Promise) {
            res.then((res) => {
              this.setState({ ...res })
            })
          } else {
            this.setState({ ...res })
          }
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
