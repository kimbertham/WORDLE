import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [data,setData] = useState({ username: 'kim', password: '123' })
  const [login, setLogin] = useState(true)
  const [err, setErr] = useState<boolean>(false)


  useEffect(() => {
    const timeout = setTimeout(() => {
      err && setErr(false)
    }, 500)
  
    return () => {
      clearTimeout(timeout)
    }
  },[err])

  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const res = await axios.post('api/login/', data)
      console.log(res)
      window.localStorage.setItem('token', res.data.token)
      window.location.href = '/'
    } catch (err){
      console.log(err)
      setErr(true)
    }
  }

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      await axios.post('api/register/', data)
      onLogin(e)
    } catch (err){
      console.log(err)
      setErr(true)
    }
  }


  return (
    <div className='auth'>
      <h1> {login ? 'Login' : 'Register'}</h1>

      <form className='center' onSubmit={login ? onLogin : onRegister}>
        
        <input
          placeholder='Username'
          name='login'
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize= 'off'
          value={data.username}
          onChange={(e) => setData({ ...data, username: e.target.value })}/>

        <input
          placeholder='Password'
          name='password'
          type='password'
          autoComplete='off'
          autoCorrect='off'
          autoCapitalize= 'off'
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}/>

        {err && <small className='err'>Invalid! Try again...</small>}

        <button>{login ? 'Log in' : 'Register'}</button>
      </form>
      
      {login ? 
        <span onClick={() => setLogin(false)}> Not a member?</span> 
        : <span onClick={() => setLogin(true)}>Already a member?</span>}
      

    </div>
  )
}

export default Login