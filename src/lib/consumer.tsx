import React, { PureComponent } from 'react'
import { BaseUpdaters, CustomContext, MapContextToProps } from './types'
import { getProps } from './get-props'
const RenderChildren = React.memo(({ renderChildren, props }: any) => {
  return React.Children.map(renderChildren, (child) => {
    return React.cloneElement(child, props)
  })
})

export const getConsumerClass = <State, Updaters extends BaseUpdaters>(
  Context: CustomContext<State, Updaters>
) => {
  return class Consumer extends PureComponent<{
    mapContextToProps: MapContextToProps<State, Updaters>
  }> {
    prevProps: Partial<State & Updaters> = {}
    render() {
      const { mapContextToProps } = this.props
      return (
        <Context.Consumer>
          {({ state, updaters }) => {
            this.prevProps = getProps(
              this.prevProps,
              mapContextToProps,
              state,
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
