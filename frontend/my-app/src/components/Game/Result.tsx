import React, { useEffect, useState } from 'react'
import { getDef } from '../../lib'

interface ResultProps {
word: string;
setResult: React.Dispatch<React.SetStateAction<boolean>>
}

const Result = ({ word, setResult }:ResultProps ) => {
  const [define, setDefine] = useState<{word:string, definitions:{definition: string}[]}>()


  useEffect(() => {
    getDefintion(word)
  },[])

  const getDefintion = async (word:string) => {
    const def = await getDef(word)
    setDefine(def)
  }

  if (!define) return null
  return (
    <div className='res'>
      <div className='rmid'>

        <div className='exit'>
          <p onClick={() =>setResult(false)}>X</p>
        </div>

        <h1>{word}</h1>
        <p>{define.definitions[0].definition}</p>
      </div>
    </div>
  )
}
export default Result