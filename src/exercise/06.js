// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

// Extra Credit
// 1. 💯 handle errors
// 2. 💯 use a status
// 3. 💯 store the state in an object
// 4. 💯 create an ErrorBoundary component
// 5. 💯 re-mount the error boundary
// 6. 💯 use react-error-boundary
// 7. 💯 reset the error boundary
// 8. 💯 use resetKeys

import React from 'react'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'
import {ErrorBoundary} from 'react-error-boundary'

function PokemonInfo({pokemonName}) {
  const [state, setState] = React.useState({
    status: 'idle',
    pokemon: null,
    error: null,
  })
  //   idle: no request made yet
  // pending: request started
  // resolved: request successful
  // rejected: request failed

  // 🐨 Have state for the pokemon (null)
  // 🐨 use React.useEffect where the callback should be called whenever the
  // pokemon name changes.
  // 💰 DON'T FORGET THE DEPENDENCIES ARRAY!
  // 💰 if the pokemonName is falsy (an empty string) then don't bother making the request (exit early).
  // 🐨 before calling `fetchPokemon`, make sure to update the loading state
  // 💰 Use the `fetchPokemon` function to fetch a pokemon by its name:
  //   fetchPokemon('Pikachu').then(
  //     pokemonData => { /* update all the state here */},
  //   )
  React.useEffect(() => {
    if (!pokemonName) return
    setState({status: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemonData => {
        setState({pokemon: pokemonData, status: 'resolved'})
      },
      error => {
        setState({error, status: 'rejected'})
      },
    )
  }, [pokemonName])
  // 🐨 return the following things based on the `pokemon` state and `pokemonName` prop:
  //   1. no pokemon name: 'Submit a pokemon'
  //   2. pokemon name but no pokemon: <PokemonInfoFallback name={pokemonName} />
  //   3. pokemon: <PokemonDataView pokemon={pokemon} />

  const {status, pokemon, error} = state
  if (status === 'rejected') throw error
  else if (status === 'idle') return <div>Submit a pokemon</div>
  else if (status === 'pending')
    return <PokemonInfoFallback name={pokemonName} />
  else if (status === 'resolved') return <PokemonDataView pokemon={pokemon} />
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary
          FallbackComponent={Error}
          resetKeys={[pokemonName]}
          /* Extra Credit 7. solution */
          // onReset={() =>
          //   // reset the state of your app so the error doesn't happen again
          //   setPokemonName('')
          // }
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App

function Error({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      {/* Extra Credit 7. solution 
      <button onClick={resetErrorBoundary}>Try again</button> */}
    </div>
  )
}

/* Custom ErrorBoundary component for extra credit 4 */
// class ErrorBoundary extends React.Component {
//   state = {error: null}

//   static getDerivedStateFromError(error) {
//     // Update state so the next render will show the fallback UI.
//     return {error}
//   }

//   componentDidCatch(error, errorInfo) {
//     // You can also log the error to an error reporting service
//     console.error(error, errorInfo)
//   }

//   render() {
//     const {error} = this.state
//     if (error) {
//       return <Error error={error} />
//     }

//     return this.props.children
//   }
// }
