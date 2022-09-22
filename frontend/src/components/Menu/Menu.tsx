import React, { useEffect, useState } from 'react'
import { headers,cap } from '../../lib'
import axios from 'axios'
import Search from './Search'
import { IFriend } from '../../types'

const token = localStorage.getItem('token')

const Menu = () => {
  const [friends, setFriends] = useState<IFriend[]>([])
  const [showFriends,setShowFriends] = useState<boolean>(false)

  useEffect(()=> {
    
    const getFriends = async () => {
      const friends = (await axios.post('/api/getFriends', null , headers)).data
      setFriends(friends)
    }
    token && getFriends()
    
  },[])
  
  const logout = () => {
    localStorage.removeItem('token')
    locate('')
  }

  const locate = (path:string) => {
    window.location.replace(`/${path}`)
  }

  return (
    <div className='menu'>

      {token ? 
        <>
          <Search friends={friends}/>

          <div className='mField' onClick={() => locate('')}>
            <p>Play</p>
          </div>

          <div className='mField' onClick ={()=> setShowFriends(!showFriends)}>
            <p> Friend Games</p>
          </div>

          {showFriends && friends.length > 0 && 
            friends.map((f,i) => {
              console.log(f)
              return <div className='sUser' key={i} onClick={() => locate(`friend/${f._id}`)}>
                <p>{cap(f.users[0].username)}</p>
              </div>
            })
          }
            
          {showFriends && friends.length === 0 && 
          <div className='sUser'>
              No friends yet 
          </div>
          }
              
      
          <div className='mField' onClick={logout}>
            <p>Log out</p>
          </div>
        </>

        :   
        <div className='mField' onClick={() => locate('login')}>
          <p>Login</p>
        </div>

      }
      
    </div>
  )
}
export default Menu