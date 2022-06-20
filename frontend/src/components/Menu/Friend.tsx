/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react' 
import axios from 'axios'
import { headers, cap } from '../../lib'
import { IGame } from '../../types'
import Word from '../Game/Word'

interface FriendMenuProps { 
  _id: string;
}

const FriendMenu = ({ _id }: FriendMenuProps) => {
  const [games, setGames] = useState<IGame[]>([])
  const [index,setIndex] = useState(0)
  const [selected, setSelected] = useState<IGame | null>()
  const [hide, setHide] = useState(false)

  useEffect(() => {
    getGames()
  }, [])

  const getGames = async () => {
    const res = (await axios.post(`/api/getFriendGames/${_id}`, { skip: index, limit: 5 }, headers)).data
    if (res.length < 5 ) setHide(true)
    setGames( games.length  === 0 ? res : [...games, ...res]) 
    setIndex(index + 5)
  }

  if (!games) return <p>No games yet...</p>

  return (
    <div className='friendMenu'>

      {selected && 
        <div>
          <div className='close'>
            <button className='button' onClick={() => setSelected(null)}> back</button>
          </div>

          <div className='showPastCont'>
            {selected.players.map(p => 
              <div className='showPast'>
                <h1>{cap(p.user.username)}</h1>
                <Word arr={[]} guess={p.guesses} word={p.word.split('')}/> 
              </div>
            )}
          </div>
        </div> 
      }
      
      {!selected && games.length > 0 && 
      <div>
        {games.map(g => 
          <div key={g._id} className='pastGames' onClick={() => setSelected(g)}>
            <div className='small'>
              <Word arr={[]} guess={g.players[0].guesses} word={g.players[1].word.split('')}/>
            </div>
            <div>
              <p>{cap(g.players[1].word)}</p>
              <p>Guesses: {g.players[0].guesses.length}/6</p>
              <p>Score: {g.players[0].guesses.length}:{g.players[1].guesses.length }</p>
              <p>Winner: {g.players[0].guesses.length > g.players[1].guesses.length ? 
                g.players[1].user.username : g.players[0].user.username}</p>
            </div>
          </div>
        )}

        <div className='hide'>
          {!hide ? <button onClick={getGames} className='button'>Load More...</button>
            : <small>No more games ....</small>}
        </div>
      </div>
      }

    </div>
  )
}
export default FriendMenu