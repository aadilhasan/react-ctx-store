import React, { PureComponent } from 'react'
import { BaseUpdaters, CustomContext, MapContextToProps } from './types'
import { getProps } from './get-props'
const RenderChildren = React.memo(({ renderChildren, props }: any) => {
  return React.Children.map(renderChildren, (child) => {
    return React.cloneElement(child, props)
  })
})

export const getConsumerClass = <Store, Updaters extends BaseUpdaters>(
  Context: CustomContext<Store, Updaters>
) => {
  return class Consumer extends PureComponent<{
    mapContextToProps: MapContextToProps<Store, Updaters>
  }> {
    prevProps: Partial<Store & Updaters> = {}
    render() {
      const { mapContextToProps } = this.props
      return (
        <Context.Consumer>
          {({ store, updaters }) => {
            this.prevProps = getProps(
              this.prevProps,
              mapContextToProps,
              store,
              updaters
            )
            return (
              <RenderChildren
                renderChildren={this.props.children}
                props={this.prevProps}
              />
            )
          }}
        </Context.Consumer>
      )
    }
  }
}
