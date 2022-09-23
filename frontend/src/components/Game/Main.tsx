import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { IPlayer } from '../../types'
import { getToken, headers } from '../../lib/lib'
import { checkWord } from '../../lib/lib'
import Word from './Word'
import Keyboard from './Keyboard'

interface MainProps { 
  word: string[];
  game?:IPlayer;
  setResult:React.Dispatch<React.SetStateAction<boolean>>
}

const Main = ({ game, word, setResult }: MainProps) => {
  const [arr, setArr] = useState<string[]>([])
  const [player,setPlayer] = useState<IPlayer | null>(game ? game : null)
  const [guess, setGuess] = useState<string[]>( game?.guesses || [])
  const [disabled,setDisabled] = useState<boolean>(game?.completed ? true : false)
  const [err,setErr] = useState<string|null>()
  const [flip, setFlip] = useState<boolean>(false)
  const token = getToken()

  useEffect(() => {
    arr.length > 0 && updateGame()
    setArr([])
  },[guess])

  useEffect(() => {
    const timer = setTimeout(() =>  setErr(null), 800)
    return () => clearTimeout(timer)
  }, [err])
  

  const addGuess = () => {
    setGuess([...guess,arr.join('')])
  }

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

  const check = async () => {
    if (arr.length <= 4) {
      setErr('Word too short!')
    } else  if (!(await checkWord([...arr].join('')))) {
      setErr('Not in word list')
    } else {
      player ? addGuess() : newGame()
    }
  }

  return (
    <div className='fgrow flex fcol'>

      {/* <button onClick={() =>setFlip(!flip)}>flip</button> */}

      <Word 
        flip={flip}
        err={err}
        arr={arr}
        word={word}
        guess={guess}/>

      <Keyboard 
        arr={arr}
        word={word}
        guess={guess}
        setArr={setArr}
        check={check}
        disabled={disabled}/>

    </div>

  )
} 

export default Main