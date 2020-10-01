// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

// Extra Credit
// 3. 💯 add game history feature

import React from 'react'
import {useLocalStorageState} from '../utils'

function Board({onClick, squares}) {
  function renderSquare(i) {
    return (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    )
  }
  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function Game() {
  const [history, setHistory] = useLocalStorageState(
    'tic-tac-toe:history',
    Array(9).fill(null),
  )
  const [currentStep, setCurrentStep] = useLocalStorageState(
    'tic-tac-toe:step',
    0,
  )

  const currentSquares = history[currentStep]

  // - nextValue ('X' or 'O')
  const nextValue = calculateNextValue(currentSquares)
  // - winner ('X', 'O', or null)
  const winner = calculateWinner(currentSquares)
  // - status (`Winner: ${winner}`, `Scratch: Cat's game`, or `Next player: ${nextValue}`)
  const status = calculateStatus(winner, currentSquares, nextValue)

  function selectSquare(square) {
    if (currentSquares[square] || winner) return

    const newHistory = history.slice(0, currentStep + 1)
    const currentSquaresCopy = [...currentSquares]

    currentSquaresCopy[square] = nextValue
    setHistory([...newHistory, currentSquaresCopy])
    setCurrentStep(prev => prev + 1)
  }

  function restart() {
    setHistory([Array(9).fill(null)])
    setCurrentStep(0)
  }

  const moves = history.map((_, step) => {
    const isCurrentStep = step === currentStep
    const desc = step ? `Go to move #${step}` : 'Go to game start'

    return (
      <li key={step}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(step)}>
          {desc} {isCurrentStep ? '(current)' : null}
        </button>
      </li>
    )
  })
  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={restart}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

// eslint-disable-next-line no-unused-vars
function calculateNextValue(squares) {
  const xSquaresCount = squares.filter(r => r === 'X').length
  const oSquaresCount = squares.filter(r => r === 'O').length
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

// eslint-disable-next-line no-unused-vars
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}

function App() {
  return <Game />
}

export default App
