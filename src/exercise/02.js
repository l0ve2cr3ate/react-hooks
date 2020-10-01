// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'

function Greeting({initialName = ''}) {
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  const [name, setName] = useLocalStorageState('name')

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App

// Extra Credit
// 1. 💯 lazy state initialization
// 2. 💯 effect dependencies
// 3. 💯 custom hook
// 4. 💯 flexible localStorage hook

const useLocalStorageState = (key, initialValue = '') => {
  const [state, setState] = React.useState(() => {
    let localStorageState = window.localStorage.getItem(key)
    if (localStorageState) {
      localStorageState = JSON.parse(window.localStorage.getItem(key))
    }
    return localStorageState || initialValue
  })

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
