/* eslint-disable react-hooks/exhaustive-deps */

import React from 'react'

interface WordProps { 
  word:string[]
  arr: string[]
  guess:string[]
}
const Word = ({ word, arr, guess } :WordProps) => {

  const currentGuess = (i:number, e:number) => 
    <div  
      key={e} className={`letter ${word === arr  && 'green'}`}>
      <p>{arr[e]}</p>
    </div>
  
  const pastGuess = (i:number, e:number) =>
    <div 
      key={e} className={`letter ${guess[i].split('')[e] === word[e] ? 'green'
        : word.includes(guess[i].split('')[e]) ? 'yellow' : 'grey' }`}>
      <p>{guess[i].split('')[e]} </p> 
    </div>

  return (
    <div className='wordRow'>

      {[...Array(6)].map((e,i) => 
        <div className='flex fw' key={i}>
          {guess.length === i ? [...Array(word.length)].map((l,e) =>currentGuess(i,e))
            :  i < guess.length  ?  [...Array(word.length)].map((l,e) => pastGuess(i,e))
              : [...Array(word.length)].map((l,i) => <div key={i} className='letter'></div>)
          }
        </div>
      )}  

    </div>
  )
}
export default Word