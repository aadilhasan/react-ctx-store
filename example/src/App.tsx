import React from 'react'
import { createContext } from 'react-ctx-store'

const { Consumer, Provider, connect } = createContext(
  { theme: 'dark', time: Date.now() },
  {
    toggleTheme: (state: any, newTheme: string) => {
      return {
        theme: newTheme ? newTheme : state.theme === 'dark' ? 'light' : 'dark'
      }
    },
    updateTime: () => ({
      time: Date.now()
    })
  }
)

const Hello = ({ theme, toggleTheme }: any) => {
  console.log(' re-render Hello')

  return (
    <div>
      <h1> Theme: {theme}</h1>
      <button onClick={() => toggleTheme()}> toggle theme </button>
    </div>
  )
}

const DateComp = ({ date, updateDate }: any) => {
  console.log(' re-render DateComp')
  return (
    <div>
      <h1> Date: {date}</h1>
      <button onClick={updateDate}> updateDate </button>
    </div>
  )
}

const ConnectedComp = connect(({ time, updateTime }) => {
  return { date: time, updateDate: updateTime }
})(DateComp)

const App = () => {
  return (
    <Provider>
      <Consumer mapContextToProps={['theme', 'toggleTheme']}>
        <Hello />
      </Consumer>
      <Consumer
        mapContextToProps={({ toggleTheme }) => ({
          theme: 'red',
          toggleTheme: () => toggleTheme('blue')
        })}
      >
        <Hello />
      </Consumer>
      <ConnectedComp />
    </Provider>
  )
}

export default App
