import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { IPlayer } from '../../types'
import { userId, headers } from '../../lib/lib'
import Word from '../Game/Word'

const SoloMenu = () => {
  const id = userId()
  const [games,setGames] = useState<IPlayer[]>([])
  const [index,setIndex] = useState(0)
  const [selected, setSelected] = useState<IPlayer| null>()

  useEffect(() => {
    getGames()
  }, [])

  const getGames = async () => {
    const res  = (await axios.post(`/api/getSoloGames/${id}` , { num: index }, headers)).data
    setGames( games.length  === 0 ? res : [...games, ...res]) 
    setIndex(index + 5)
  }

  return (
    <div className='pastMenu'>

      <div>
        {selected ? 
          <div className='mh mw center'>
            <div className='showPast'>
              <h1>{selected.word}</h1>
              <div className='small'>
                <Word arr={[]} guess={selected.guesses} word={selected.word.split('')}/>
              </div>
              <button className='button' onClick={() => setSelected(null)}>Back...</button>
            </div>
          </div>
          :

          games.map(g => 
            <div key={g._id} className='pastGame' onClick={() => setSelected(g)}>
              <div className='small'>
                <Word arr={[]} guess={g.guesses} word={g.word.split('')}/>
              </div>
              <div className='pastInfo'>
                <h1>{g.word}</h1>
                <p>Guesses: {g.guesses.length}/6</p>
              </div>
            </div>
          )}
      
    
      </div>
    </div>
  )
}

export default SoloMenu