import React from 'react'
import { createContext } from '.'

import Enzyme from 'enzyme'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'

Enzyme.configure({ adapter: new Adapter() })
const State = {
  count: 0,
  time: Date.now()
}

const updater = {
  updateCount: (state: any) => {
    return {
      count: state.count + 1
    }
  },
  updateTime: () => {
    return {
      time: Date.now()
    }
  }
}

const { Provider, Consumer } = createContext(State, updater)

interface CompProps extends Partial<typeof State & typeof updater> {
  didUpdate: () => {}
}
class Comp extends React.Component<CompProps> {
  componentDidUpdate({ didUpdate }) {
    if (didUpdate && this.props.didUpdate) {
      this.props.didUpdate()
    }
  }
  render() {
    const { count, updateCount } = this.props
    return (
      <div>
        <span id='count'>{count}</span>
        <button id='update' onClick={updateCount}>
          Update Count
        </button>
      </div>
    )
  }
}

class Comp2 extends React.Component<CompProps> {
  componentDidUpdate({ didUpdate }) {
    if (didUpdate && this.props.didUpdate) {
      this.props.didUpdate()
    }
  }
  render() {
    const { time, updateTime } = this.props
    return (
      <div>
        <span id='time'>{time}</span>
        <button id='update-time' onClick={updateTime}>
          Update Time
        </button>
      </div>
    )
  }
}

const App = ({ didUpdate1, didUpdate2 }: any) => {
  return (
    <Provider>
      <Consumer mapContextToProps={['count', 'updateCount']}>
        <Comp didUpdate={didUpdate1} />
      </Consumer>
      <Consumer mapContextToProps={['time', 'updateTime']}>
        <Comp2 didUpdate={didUpdate2} />
      </Consumer>
    </Provider>
  )
}

describe('ExampleComponent', () => {
  let app
  beforeEach(() => {
    app = Enzyme.mount(<App />)
  })

  it('works as expect', () => {
    const instance1 = app.find(Comp).at(0).instance()
    expect(instance1.props).toHaveProperty('count', State.count)
    expect(instance1.props).toHaveProperty('updateCount')
    expect(app.find('#count').html()).toMatch('' + State.count)

    const instance2 = app.find(Comp2).at(0).instance()
    expect(instance2.props).toHaveProperty('time', State.time)
    expect(instance2.props).toHaveProperty('updateTime')
    expect(app.find('#time').html()).toMatch('' + State.time)
  })

  it('should update', async () => {
    let fn = jest.fn()
    app.setProps({ didUpdate1: fn })
    app.find('#update').simulate('click')
    let instance = app.find(Comp).at(0).instance()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(instance.props).toHaveProperty('count', 1)
    expect(app.find('#count').html()).toMatch('' + (State.count + 1))
  })

  it('should update2', async () => {
    let fn = jest.fn()
    app.setProps({ didUpdate2: fn })
    app.find('#update-time').simulate('click')
    expect(fn).toHaveBeenCalledTimes(1)
    expect(app.find('#time').html()).toBeTruthy()
    expect(app.find('#time').html()).not.toMatch('' + State.time)
  })

  it('Comp2 should not re-render if Comp1 subscribed context value changed and Comp2 has subscribed to differnet context values then Comp1', () => {
    let fn = jest.fn()
    let fn2 = jest.fn()
    app.setProps({
      didUpdate1: fn,
      didUpdate2: fn2
    })
    app.find('#update').simulate('click')
    expect(fn).toBeCalledTimes(1)
    expect(fn2).not.toBeCalled()
  })

  it('Comp1 should not re-render if Comp2 subscribed context value changed and Comp1 has subscribed to differnet context values then Comp2', () => {
    let fn = jest.fn()
    let fn2 = jest.fn()
    app.setProps({
      didUpdate1: () => {
        console.log('called')
        fn()
      },
      didUpdate2: fn2
    })
    app.find('#update-time').simulate('click')
    expect(fn2).toBeCalledTimes(1)
    expect(fn).not.toBeCalled()
  })
})
