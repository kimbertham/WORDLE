import React, { useState } from 'react'
import axios from 'axios'

const Login = () => {
  const [data,setData] = useState({ username: '', password: '' })
  const [login, setLogin] = useState(true)


  const onLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      const res = await axios.post('api/login/', data)
      window.localStorage.setItem('token', res.data.token)
      window.location.href = '/'
    } catch (err){
      console.log(err)
    }
  }

  const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      await axios.post('api/register/', data)
      onLogin(e)
    } catch (err){
      console.log(err)
    }
  }


  return (
    <div className='auth'>
      <h1> {login ? 'Login' : 'Register'}</h1>

      <form className='center' onSubmit={login ? onLogin : onRegister}>
        
        <input
          placeholder='Username'
          name='login'
          autoComplete='false'
          onChange={(e) => setData({ ...data, username: e.target.value })}/>
 
        <input
          placeholder='Password'
          name='password'
          autoComplete='false'
          onChange={(e) => setData({ ...data, password: e.target.value })}/>

        <button>{login ? 'Log in' : 'Register'}</button>
      </form>
      
      {login ? 
        <span onClick={() => setLogin(false)}> Not a member?</span> 
        : <span onClick={() => setLogin(true)}>Already a member?</span>}
      

    </div>
  )
}

export default Login