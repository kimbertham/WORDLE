import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { IGame } from '../../types'
import { headers, userId } from '../../lib/lib'

interface RequestProps {
  setCurrentRound:  React.Dispatch<IGame>
  currentRound: IGame | undefined
  setRequest: React.Dispatch<React.SetStateAction<boolean>>
}

const Request = ({ setCurrentRound, currentRound }:RequestProps) => {
  const history = useHistory()

  const decline = async () => {
    const res = await axios.get(`api/declineRequest/${currentRound?._id}`, headers)
    setCurrentRound(res.data)
  }

  const accept = () => {
    history.push(`/new/${currentRound?.friendship}`)
  }

  if (!currentRound) return null
  return (
    <div className='req'>
        
      {currentRound.players[0].user?._id === userId() ?
        <>
          <h1> New Request</h1>
          <div className='flex'> 
            <button onClick={accept}>Accept</button>
            <button onClick={decline}>Decline</button>
          </div>
        </>
        :
        <>
          <h1> Request Sent! </h1>
          <div className='word'>
            {currentRound.players[0].word.split('').map((l:string,i :number) => 
              <div key={i} className='letter row'> {l} </div>)}
          </div> 
          <p> Waiting for response!</p>
        </>
      }
    </div>
  )

}

export default Request