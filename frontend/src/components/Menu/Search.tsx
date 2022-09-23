import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { headers, cap } from '../../lib/lib'
import { IUser, IFriend } from '../../types'


interface SearchProps {
  friends: IFriend[]
}

const Search = ({ friends }: SearchProps) => {
  const [data,setData] = useState({ username: '' })
  const [users, setUsers] = useState<IUser[]>([])


  useEffect(() =>{
    const find = async () => setUsers((await axios.post('/api/find', data, headers)).data)
    find()
  },[data])

  const newFriend = async (u:IUser) => {
    const res =  (await axios.post('/api/newFriend',{ user: u }, headers)).data
    window.location.replace(`/friend/${res._id}`)
  }

  const locate = (u: IUser) => {
    const i = friends.findIndex(f => f.users[0]._id === u._id)
    return friends[i]._id
  }

  return (
    <>
      <div className='mField'>
        <div className='search'>
          <input 
            placeholder='Search for friends'
            onChange={(e) => setData({ ...data, username: e.target.value })}/>
        </div>
      </div>

      {users.length > 0 && 
        <div>
          {users.map((u,i) => 
            <div className='sUser' key={i}>
              {cap(u.username)}
              {[...friends].map(f => f.users[0]).some(f => f.username === u.username) ?
                <button onClick={() => window.location.replace(`/${locate(u)}`)}> ↪ </button> 
                : <button onClick={() => newFriend(u)}> + </button> }
            </div>
          )}           
        </div>}
    </>
  
  )
}
export default Search