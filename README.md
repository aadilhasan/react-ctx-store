# react-ctx-store

> A React context wrapper, which makes context more performant, scalable and easy to use.

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

function CounterComponent ({count, updateCount}) {
  return (
    <div>
      <span>{count}</span>
      <button onClick={updateCount}>update count</button>
    </div>
  )
}

export function ExampleApp (){
  return (
      <Provider>
        <Consumer mapContextToProps={['count', 'updateCount']}>
          <CounterComponent/>
        </Consumer>
      </Provider>
    )
}
```

### API

```tsx
import { creatContext } from 'react-ctx-store'

const store = {
  count: 0,
}

// an object of where every key should be an string and value should be a function which will update the store
const updaters = {
  updateCount: (store, ...rest) => {
    return {
      count: store.count + 1;
    }
  }
}

const { Consumer, Provider, connect, useStore, _context } = createContext(
  store,
  updaters
)
```

`react-ctx-store` exposes one single method `createContext` which takes 2 arguments

- Store - a javascript object.
- Updaters - an object of functions, only these functions can update the store, every updater function receives store as the first argument, and rest of the argument can be passed by the caller function. To update the store updater function will have to return an updated store value.

`createContext` returns following Components and methods:

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

#### 3. useStore

A hook, which returns store and updaters.

Note: the component using useStore hook will re-render if any value changes in the store.

```tsx
function WithHooks() {
  const { count, updateCount } = useStore()
  return (
    <div>
      <span>{count}</span>
      <button onClick={updateCount}>Update Count</button>
    </div>
  )
}
```

#### 4. \_context

A React Context object which is being used to store the the values, it is being exposted in cause a user wants to have acess to original Context.

### Examples

#### Async operation in updaters

```tsx
import { createContext } from 'react-ctx-store'

const store = {
  userData: null
}

const updaters = {
  fetchUserData: async (store, userId) => {
    const userData = await fetch('.../user/' + userId)
    return { userData }
  }
}

const { Consumer, Provider } = createContext(store, updaters)

function UserProfile({ userData, fetchUserData }) {
  useEffect(() => {
    fetchUserData('123')
  }, [])
  return <div>UserName: {userData.name}</div>
}

export function App() {
  return (
    <Provider>
      <Consumer mapContextToProps={['userData', 'fetchUserData']}>
        <UserProfile />
      </Consumer>
    </Provider>
  )
}
```

## License

MIT © [aadilhasan](https://github.com/aadilhasan)
