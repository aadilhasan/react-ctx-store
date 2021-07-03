import { createContext } from '.'
import React from 'react'
const State = {
  count: 0
}

const updater = {
  updateCount: (state: any) => {
    return {
      count: state.count + 1
    }
  }
}

const { Provider, Consumer } = createContext(State, updater)

class Comp extends React.Component<Partial<typeof State & typeof updater>> {
  render() {
    const { count, updateCount } = this.props
    return (
      <div>
        <span id='count'>{count}</span>
        <button onClick={updateCount}>Update Count</button>
      </div>
    )
  }
}

const App = () => {
  return (
    <Provider>
      <Consumer mapContextToProps={['count', 'updateCount']}>
        <Comp />
      </Consumer>
    </Provider>
  )
}

describe('ExampleComponent', () => {
  it('is truthy', () => {
    expect(ExampleComponent).toBeTruthy()
  })
})
