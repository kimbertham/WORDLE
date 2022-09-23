
import React, { useState } from 'react'
import { IGame } from '../../types'
import { useHistory } from 'react-router-dom'
import { cap } from '../../lib/lib'
import Score from './Score'
import Word from '../Game/Word'

interface friendResultProps {
  currentRound : IGame
  setResult: React.Dispatch<React.SetStateAction<boolean>>
}

const friendResult = ({ currentRound ,setResult }:friendResultProps) => {
  const [showOpp, setShowOpp] = useState<boolean>(false)
  const history = useHistory()
  const p1 = currentRound.players[0]
  const p2 = currentRound.players[1]

  const getWinner = () => {
    if (p1.completed && p2.completed ){
      
      return  p1.guesses.length > p2.guesses.length ?
        p2.user.username  
        : p1.guesses.length === p2.guesses.length ? 'TIE' 
          : p1.user.username

    } else {
      return 'TBA'
    }
  }

  return (
    <div className='res'>
      <div className='rmid'>

        {!showOpp && <>

          <div className='exit'>
            <p onClick={() =>setResult(false)}>X</p>
          </div>

          <div className='winner'>
            <p>Winner</p>
            <h1>{cap(getWinner())}</h1> 
          </div>

          <div className='resScores'>
            <div>
              <h2>{cap(p1.user.username)}</h2>
              <p>Word: {p1.word}</p>
              <p>{p1.completed ? 
                `Guesses:${p1.guesses.length}/6` 
                : `${p1.user.username} hasnt made their guesses yet`
              }</p>
            </div>

            <div>
              <h2>{cap(p2.user.username)}</h2>
              <p>Word: {p2.word}</p>
              <p>{p2.completed ? 
                `Guesses:${p2.guesses.length}/6` 
                : `${p2.user.username} hasnt made their guesses yet`
              }</p>
            </div>
          </div>

          <Score currentRound={currentRound}/>
    
          {p1.completed && p2.completed && 
          <div className='buttons'>
            <button onClick={() => history.push(`/new/${currentRound.friendship}`)}> 
              <p>New Game </p>
            </button>
            <button onClick={() =>setShowOpp(true)}>See {p2.user.username}'s Game</button>
          </div>
          }
        </>}  
      
        {showOpp && 
            <div className='resWord'>
              <h1>{p2.word}</h1>
              <Word arr={[]} guess={p2.guesses} word={p2.word.split('')}/> 
              <button className='button' onClick={() => setShowOpp(false)}>back</button>
            </div>
        }
        
      </div>
    </div>
  )
}

export default friendResult