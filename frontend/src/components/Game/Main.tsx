import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IPlayer, IGame } from '../../types'
import { getToken, headers } from '../../lib'
import Word from './Word'
import Keyboard from './Keyboard'

interface MainProps { 
  word: string[];
  game?:IPlayer;
  round? : IGame;
  setResult:React.Dispatch<React.SetStateAction<boolean>>
}

const Main = ({ game, word, setResult }: MainProps) => {
  const [arr, setArr] = useState<string[]>([])
  const [player,setPlayer] = useState<IPlayer | null>(game ? game : null)
  const [guess, setGuess] = useState<string[]>( game?.guesses || [])
  const [disabled,setDisabled] = useState<boolean>(game?.completed ? true : false)
  const token = getToken()


  useEffect(() => {
    arr.length > 0 && updateGame()
    setArr([])
  },[guess])

  const newGame = async () => {
    if (token) {
      const res = await axios.post('api/newSoloGame/', { word: word.join('') }, headers)
      setPlayer(res.data)
    }
    addGuess()
  }
  
  const updateGame = async () => {

    if (arr.join('') === word.join('')) {
      completeGame()
    } else if ( arr !== word && guess.length === 6){
      completeGame()
    }
    token && await axios.post(`/api/updateGame/${player?._id}` , { guesses: guess } ,headers)
  }

  const completeGame = async () => {
    token && await axios.post(`/api/completeGame/${player?._id}`,{}, headers)
    setDisabled(true)
    setResult(true)
  }

  const addGuess = () => {
    setGuess([...guess,arr.join('')])
  }

  return (
    <div className='fgrow flex fcol'>
    
      <Word 
        arr={arr}
        word={word}
        guess={guess}/>

      <Keyboard 
        arr={arr}
        word={word}
        guess={guess}
        setArr={setArr}
        disabled={disabled}
        onSubmit={player  ? addGuess : newGame }/>

    </div>

  )
} 

export default Main