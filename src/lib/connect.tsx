import React from 'react'
import { MapContextToProps, BaseUpdaters } from './types'

export const getConnect = <Store, Updaters extends BaseUpdaters>(
  Consumer: React.ElementType
) => {
  return (mapContextToProps: MapContextToProps<Store, Updaters>) =>
    (Component: React.ElementType) => {
      return React.forwardRef((props, ref) => (
        <Consumer mapContextToProps={mapContextToProps}>
          <Component {...props} ref={ref} />
        </Consumer>
      ))
    }
}
