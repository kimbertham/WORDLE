
import React, { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import axios from 'axios'

import { useHistory, useParams } from 'react-router-dom'
import { headers } from '../../lib'
import { IGame } from '../../types'

import Request from './Request'
import Main from '../Game/Main'
import Result from './Result'
import Score from './Score'

interface FriendProps { 
  setFriend: React.Dispatch<React.SetStateAction<string>>
}

const Friend = ({ setFriend }: FriendProps) => {
  const { id } = useParams<{ id: string }>()
  const history = useHistory()

  const [request, setRequest] = useState<boolean>(true)
  const [result , setResult] = useState<boolean>(false)
  const [currentRound , setCurrentRound] = useState<IGame|null>()

  useEffect(() => {
    // const socket = io('http://localhost:4000')
    const socket = io()
    socket.emit('joinroom', id)
    socket.on('reUp', () => {
      getLastRound()
    })

    return () => {
      socket.close() 
    }
  },[])

  useEffect(() => {
    setFriend(id)
    getLastRound()
  },[])

  useEffect(() => {
    const socket = io()
    // const socket = io('http://localhost:4000')
    result && getLastRound()
    result && socket.emit('showScore', id)
    return () => {
      socket.close() 
    }
  }, [result])

  const getLastRound = async () => {
    const res = (await axios.post(`/api/getFriendGames/${id}`, { skip: 0, limit: 1 },headers)).data[0]
    if (res) {
      setCurrentRound(res)

      if (res.players[0].completed) {
        setResult(true)
      }

      if (res.request) {
        setRequest(true)
      }

    } else {
      history.push(`/new/${id}`)
    }
  }

  if (!currentRound) return null

  if (currentRound.request && request) return  (
    <Request
      setRequest={setRequest}
      currentRound={currentRound}
      setCurrentRound={setCurrentRound}/>
  )

  return (
    <>
      <Score currentRound={currentRound}/>

      {result &&
      <Result 
        currentRound={currentRound}
        setResult={setResult}/>}
      
      <Main 
        game={currentRound.players[0]}
        word={currentRound.players[0].word.split('')}
        setResult={setResult}/>
    </>
  )
}

export default Friend