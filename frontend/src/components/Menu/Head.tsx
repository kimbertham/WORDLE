import React, { useState } from 'react'
import Menu from './Menu'
import FriendMenu from './Friend'
import SoloMenu from './Solo'

interface HeadProps{
  friend: string
}

const Head = ({ friend }: HeadProps) => {
  const [menu, setMenu] = useState(false)
  const [friendMenu,setFriendMenu] = useState(false)
  const [soloMenu,setSoloMenu] = useState(false)
  return (

    <div className='navCont'>
      <div className='nav'>
        <img src={require('../../styles/menu.jpg')} className='navItem' onClick={() => {
          setMenu(!menu)
          setFriendMenu(false)
          setSoloMenu(false)
        }} alt='menu'/>

        <div className='logo'>Wurhdle</div>

        <img src={require('../../styles/time.jpg')} className='navItem'
          onClick={() => {
            if ( friend) {
              setFriendMenu(!friendMenu)
              setMenu(false)
            } else {
              setSoloMenu(!soloMenu)
              setMenu(false)
            } 
          }} alt='menu'/>
      </div>

      {menu && <Menu/>}
      {friendMenu &&  <FriendMenu _id={friend}/>}
      {soloMenu &&  <SoloMenu/>}

    </div>
  )
}

export default Head