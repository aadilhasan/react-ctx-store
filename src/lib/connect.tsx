import React from 'react'
import { MapContextToProps, BaseUpdaters } from './types'

export const getConnect = <State, Updaters extends BaseUpdaters>(
  Consumer: React.ElementType
) => {
  return (mapContextToProps: MapContextToProps<State, Updaters>) =>
    (Component: React.ElementType) => {
      return React.forwardRef((props, ref) => (
        <Consumer mapContextToProps={mapContextToProps}>
          <Component {...props} ref={ref} />
        </Consumer>
      ))
    }
}
