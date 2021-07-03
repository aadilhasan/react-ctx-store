# react-ctx-store

> A small react-context wrapper, which makes context more performent, scalable and easy to use, scalable and easy to use for large projects.

## Why?

React context is good, but it is not good for medium to big projects, it has following problems:

- re-rendering, context re-renders all the subsribers doesn't metter if the subsriber is using the updated property or not.
- scalability, context has this re-rendering issue, one single store is not possible so multiple context are required.
- there is not simple way to update the context, it requires a bit of extra code.

[![NPM](https://img.shields.io/npm/v/react-ctx-store.svg)](https://www.npmjs.com/package/react-ctx-store) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-ctx-store
```

### Usage

```tsx
import React, { Component } from 'react'

import { createContext } from 'react-ctx-store'

const store = {
  count: 0,
}

const updaters = {
  updateCount: (store) => {
    return {
      count: store.count + 1;
    }
  }
}

const {Consumer, Provider} = createContext(store, updaters)

const CounterComponent = ({count, updateCount}) => {
  return (
    <div>
      <span>{count}</span>
      <button onClick={updateCount}>update count</button>
    </div>
  )
}

class Example extends Component {
  render() {
    return (
      <Provider>
        <Consumer mapContextToProps={['count', 'updateCount]}>
          <CounterComponent/>
        </Consumer>
      </Provider>
    )
  }
}
```

### API

```tsx
import { creatContext } from 'react-ctx-store'

const { Consumer, Provider, connect, _context } = createContext(store, updaters)
```

`react-ctx-store` exposes one single method `createContext`, which returns following Components and methods:

#### 1. Provider

A React component allows consuming components to subscribe to context changes, similar to React Context Provider.

Usage:

```tsx
function Example() {
  return (
    /* children of the Provider will have access to store and updaters using Provider Component */
    <Provider>
      <App />
    </Provider>
  )
}
```

#### 2. Consumer

A React Component that subscribe to the values of the store/context.
Consumer takes a single prop `mapContextToProps` which take an array of properties or a callback function as value

Usage:

```tsx
/* all direct children of Consumer component will receive count as a prop */
<Consumer mapContextToProps={['count']}>...</Consumer>
```

or

```tsx
/* all direct children of Consumer component will receive totalCount as a prop */
<Consumer mapContextToProps={({count} => {totalCount: count * 10})}>
  ...
</Consumer>
```

#### 3. Connect

A method which lets you subscribe to the values of the store/context.

Usage:

```tsx
/* Component will receive count as a prop*/
const App = connect(['count'])(Component)
```

or

```tsx
/* Component will receive count as a prop*/
const App = connect((store) => {count: store.count, update: store.updateCount})(Component)
```

#### 4. \_context

A React Context object which is being used to store the the values, it is being exposted in cause a user wants to have acess to original Context.
A good use case example would be using \_context with `useContext` hooks.

## License

MIT © [aadilhasan](https://github.com/aadilhasan)
