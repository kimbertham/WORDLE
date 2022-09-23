import React, { useEffect, useState } from 'react'
import axios from 'axios'
import io from 'socket.io-client'


import { useParams, useHistory } from 'react-router-dom'
import { headers, getRandom, userId } from '../../lib/lib'
import { IUser } from '../../types'
import Keyboard from '../Game/Keyboard'

// const socket = io('http://localhost:4000')
const socket = io()

const NewGame = () => {
  const [ arr, setArr] = useState<string[]>([])
  const [ opp, setOpp] = useState<string[]>([])

  const { friend } = useParams<{ friend: string, game:string }>()
  const history = useHistory()


  useEffect(() => {
    getFriendship()
  },[])

  const getFriendship = async() => {
    const res = await  axios.get(`/api/getFriendship/${friend}`, headers)
    const opponent = res.data.users.filter((u: IUser) => u._id !== userId())[0]
    setOpp(opponent)
  }

  const newWord = async () => {
    await axios.post('/api/newInput', { user: opp, word: arr.join(''), friendship: friend }, headers)
    history.push(`/friend/${friend}`)
    socket.emit('fetch', friend)
  }

  return (
    <div className='new'>
      <h1> New Game</h1>

      <div className='top'>
        <div className='flex fw'>
          {[...Array(5)].map((l,i) => 
            <div key={i} className='letter'> {arr.length > i ? arr[i] : null} </div>)}
        </div> 
        <div className='random'>
          <button className='button' onClick={async () => setArr((await getRandom()).split(''))}>
            <small> + Random</small></button>
        </div> 
      </div>

      <Keyboard
        word={[]}
        guess={[]}
        arr={arr}
        setArr={setArr}
        check={newWord}/>
    </div>
  )
}

export default NewGame