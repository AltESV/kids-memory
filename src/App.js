import { useState, useEffect } from 'react'
import './App.css'
import Confetti from './components/Confetti'
import SingleCard from './components/SingleCard'

const cardImages = [
  { "src": "img/helmet-1.png", matched: false },
  { "src": "img/potion-1.png", matched: false },
  { "src": "img/ring-1.png", matched: false },
  { "src": "img/scroll-1.png", matched: false },
  { "src": "img/shield-1.png", matched: false },
  { "src": "img/sword-1.png", matched: false },
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [matched, setMatched] = useState(false)


  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffleCards)
      setTurns(0)
      setMatched(false)
  }

  const resetTurn = () => {
    setMatched(false)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }


  //compare cards
  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src) {
              setMatched(true)
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        console.log('try again')
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  useEffect(() => {
    shuffleCards()
  }, [])


  return (
    <div className="App">
      {matched ? <Confetti/> : ''}
      <h1>Magic Match</h1>
      <p>Turns: {turns}</p>
      <button onClick={shuffleCards} >New Game</button>
      
      <div className='card-grid'>
        {cards.map(card => (
          <SingleCard 
          key={card.id} 
          card={card} 
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched }
          disabled={disabled}
          />
        ))}
      </div>
    </div>
  );
}

export default App