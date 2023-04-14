import { useState } from 'react'
import './App.css'
import Die from './assets/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import { useEffect } from 'react'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [isDisabled, setIsDisabled] = useState(false)

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)

    }

  })



  function generateNewDic() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }
  }
  function allNewDice() {
    const newDice = []
    let counter = 0;
    while (counter < 10) {
      newDice.push(generateNewDic())
      counter = counter + 1;
    }
    return newDice
  }

  function rollDice() {
    setDice(oldDice => oldDice.map(die => {
      return die.isHeld ? die : generateNewDic()
    }))
  }


  function holdDice(id: string) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ?
        { ...die, isHeld: !die.isHeld } : die
    }))
    setIsDisabled(true)
  }


  const diceElements = dice.map(die =>
    <Die value={die.value} key={die.id} id={die.id} holdDice={() => holdDice(die.id)} isHeld={die.isHeld} />
  )
  const newGame = () => {
    setDice(allNewDice)
    setTenzies(false)
  }

  return (
    <>
      <div className="main">
        <div className="content">
          <div className='diceElements'>
            {diceElements}
          </div>

          {tenzies === false &&
            <button
              className='button'
              onClick={rollDice}
            >
              Roll
            </button>}

          {tenzies === true &&
            <button
              className='button'
              onClick={newGame}
            >
              New Game
            </button>}
        </div>

      </div>
    </>
  )
}

export default App
