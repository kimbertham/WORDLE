/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from 'react'
import { checkWord } from '../../lib'

const rows = 'QWERTYUIOPASDFGHJKLZXCVBNM'.split('')

interface KeyboardProps {
  word: string[]
  guess: string[]
  onSubmit:any
  arr: string[],
  setArr: React.Dispatch<React.SetStateAction<string[]>>;
  disabled?:boolean 
}

const Keyboard = ({ arr, setArr, onSubmit, guess, word, disabled } : KeyboardProps) => {
  const [green, setGreen] = useState<string[]>([])
  const [err,setErr] = useState<string|null>()


  useEffect(() => {
    err && setErr(null)
  },[arr])

  useEffect(() => {
    [...guess].pop()?.split('').forEach((letter,i) =>
      word[i] ===  letter && !green.includes(letter) &&  setGreen([...green, letter])), 
    [guess]
  })

  const delType = () => setArr(arr.slice(0,-1))

  const setLetter = (l:string) => arr.length < 6 && setArr([...arr, l])
  
  const check = async () => {
    if (arr.length <= 4) {
      setErr('Word too short!')
    } else  if (!(await checkWord([...arr].join('')))) {
      setErr('Not a word')
    } else {
      setErr(null)
      onSubmit()
    }
  }

  const key = (l:string) => (
    <div id={l} key={l} onClick={() => disabled ? null : setLetter(l)} 
      className={`key
    
      ${[...guess].join(' ').split('').includes(l) && word.includes(l) && !green.includes(l) ? 'yellow' : ''}
      ${[...guess].join(' ').split('').includes(l) && !word.includes(l) && 'grey'}
      ${green.includes(l) && 'green'}
      `}
    >
      <p>{l}</p>
    </div>
  )

  return (
    <div className='keyboard'>

      {err && <p className='err'>{err}</p>}
      <div className='flex'>{[...rows].splice(0,10).map(l => key(l))}</div>
      <div className='flex'>{[...rows].splice(10,9).map(l => key(l))}</div>

      <div className='flex'>
        <div onClick={() => check()} className='keyLong'>Enter</div>
        <div className='flex'>{[...rows].splice(19,9).map(l => key(l))}</div>
        <div onClick={() => delType()} className='keyLong'>Back</div>
      </div>

    </div>

  )
}
export default Keyboard