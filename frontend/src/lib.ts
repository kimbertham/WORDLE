import axios from 'axios' 
export const headers = { headers: { Authorization: `Bearer ${ window.localStorage.getItem('token')}` } }

export const userId = () => {
  const token = window.localStorage.getItem('token')?.split('.')
  if (token) return JSON.parse(window.atob(token[1])).sub
}

//---------- Words

export const wordHeaders =  () => {
  if ( process.env.REACT_APP_RAPID_KEY)
    return (
      { headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_KEY,
        'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
      }
      }
    )
}

export const checkWord = async  (word : string) =>  {
  try {
    await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${word}`, 
      wordHeaders())
    return true
  } catch (err) {
    return false
  }
}

export const getRandom = async () => {
  try {
    const res = await axios.get('https://wordsapiv1.p.rapidapi.com/words/',
      { params: { random: 'true'  , letters: 5, frequencymax: 8, partOfSpeech: 'verb', letterPattern: '^[A-Za-z]+$' },
        headers: wordHeaders()?.headers
      }
    )
    return res.data.word.toUpperCase().replace(/\s/g, '')
  } catch (err) {
    console.log(err)
  }
}

export const getDef = async (word: string) => {
  try {
    const res = await axios.get(`https://wordsapiv1.p.rapidapi.com/words/${word}/definitions`,
      wordHeaders())
    
    return res.data
  } catch (err) {
    console.log(err)
  }
}


export const cap = (str : string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}