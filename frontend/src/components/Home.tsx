/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { getRandom, headers, userId} from '../lib'
import { IPlayer } from '../types'
import Main from './Game/Main'
import Result from './Game/Result'

const user = userId()

const Home = () => {
  
  const [result, setResult] = useState<boolean>(false)
  const [word, setWord] = useState<string>('')
  const [game , setGame] = useState <IPlayer[]>()

  useEffect(() => {
    getLastGame()
  }, [])

  const getLastGame = async () => {
    if (user) {
      const res = (await axios.get('api/getLastSolo', headers)).data
      if (res.length >= 0)  {
        setWord(res[0].word)
        setGame(res)
      }
    } else {
      getWord()
      setGame([])
    }
  }

  const getWord = async () => setWord(await getRandom())
  if (!game || !word) return null
  return (
    <>
      {result &&
      <Result 
        word={word}
        setResult={setResult}/>}

      <Main
        game={game[0]}
        word={word.split('')}
        setResult={setResult}/>
      
    </>
  )
}

export default Home