/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { useParams, useHistory } from 'react-router-dom'
import { headers, getRandom, userId } from '../../lib'
import { IUser } from '../../types'

import Keyboard from '../Game/Keyboard'


const NewGame = () => {
  const [ arr, setArr] = useState<string[]>([])
  const [ opp, setOpp] = useState<string[]>([])

  const { friend, game } = useParams<{ friend: string, game:string }>()
  const history = useHistory()
 

  useEffect(() => {
    getFriendship()
  },[])

  const getFriendship = async() => {
    const res = await  axios.get(`/api/getFriendship/${friend}`, headers)
    const opponent = res.data.users.filter((u: IUser) => u._id !== userId())[0]
    setOpp(opponent)
  }
  const newGame = async () => {
    await axios.post('/api/newFriendGame/', { user: opp , word: arr.join(''), friendship: friend }, headers)
    history.push(`/friend/${friend}`)
  } 
  
  const acceptReq = async () => {
    await axios.post(`/api/acceptRequest/${game}`, { user: opp, word: arr.join('') }, headers)
    history.push(`/friend/${friend}`)
  }

  return (
    <div className='bm'>
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
        onSubmit={game ? acceptReq : newGame}/>
    </div>
  )
}

export default NewGame