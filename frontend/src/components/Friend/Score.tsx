import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { headers, cap } from '../../lib/lib'
import { IGame , ITotal } from '../../types'


interface ScoreProps {
  currentRound: IGame
}
const Score = ({ currentRound } :ScoreProps) => {
  const [total, setTotal] = useState<ITotal[]>()
  
  useEffect(() => {
    getTotal()
  }, [currentRound])

  const getTotal = async () => {
    const res = (await axios.get(`/api/totalScore/${currentRound.friendship}`, headers)).data
    setTotal(res)
  }

  if (!total || !currentRound) return null
  return (
    <div className='score'> 
      <small>{cap(currentRound.players[0].user.username)}</small>

      {total.length === 1 ? 
        <p>{total[0].priority ? `${total[0].score} : 0` : `0 : ${total[0].score}` } </p> 
        : <p>{total[0] ? total[0].score : 0} : {total[1] ? total[1].score : 0} </p>
      }

      <small>{cap(currentRound.players[1].user.username)}</small>
    </div>
  )
}
export default Score