import * as React from 'react'
import { BaseUpdaters, CustomContext } from './types'

export const getProviderClass = <Store, Updaters extends BaseUpdaters>(
  store: Store,
  updaters: Updaters,
  Context: CustomContext<Store, Updaters>
) => {
  return class Provider extends React.PureComponent {
    state: Store = store
    updaters: any = {}
    constructor(props: any) {
      super(props)
      this.setUpdaters(updaters)
    }

    setUpdaters = (updaters: BaseUpdaters) => {
      for (const key in updaters) {
        this.updaters[key] = this.getUpdaterFn(key)
      }
    }

    getUpdaterFn = (key: keyof Updaters) => {
      return async (...args: any) => {
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

    render() {
      return (
        <Context.Provider
          value={{ store: this.state, updaters: this.updaters }}
        >
          {this.props.children}
        </Context.Provider>
      )
    }
  }
}
