import React from 'react'


interface WordProps { 
  err?: string | null | undefined
  word:string[]
  arr: string[]
  guess:string[]
  flip?:boolean
}
const Word = ({ word, arr, guess, err, flip } :WordProps) => {

  const currentGuess = (i:number, e:number) => 
  // <ReactCardFlip isFlipped={flip} flipDirection="vertical">
    <div  
      key={e} className={`letter ${word === arr  && 'green'}`}>
      <p>{arr[e]}</p>
    </div>
  {/* <div 
        key={e} className={`letter grey ${word === arr  && 'green'}`}>
        <p>{arr[e]}</p>
      </div>
    </ReactCardFlip> */}
  
  const pastGuess = (i:number, e:number) =>
    <div 
      key={e} className={`letter ${guess[i].split('')[e] === word[e] ? 'green'
        : word.includes(guess[i].split('')[e]) ? 'yellow' : 'grey' }`}>
      <p>{guess[i].split('')[e]} </p> 
    </div>



  return (
    <div className='center fgrow'>

      {err && <p className='err'>{err}</p>}

      {[...Array(6)].map((e,i) => 
        <div className='flex' key={i}>
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