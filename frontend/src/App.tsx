import React, { useState }  from 'react'
import { BrowserRouter,Switch,Route } from 'react-router-dom'
import Login from './components/Login'
import Head from './components/Menu/Head'
import Friend from './components/Friend/Friend'
import SoloGame from './components/Home'
import NewGame from './components/Friend/New'

const App = () => {
  const [friend, setFriend] = useState<string>('')
  return ( 

    <BrowserRouter>
      <Head friend={friend} />
      <div className='main'>
        <Switch>
          <Route  path='/login' component={Login}/> 
          <Route  path='/friend/:id/' component={() => <Friend setFriend={setFriend}/>}/> 
          <Route path='/new/:friend/:game' component={NewGame} />
          <Route path='/new/:friend' component={NewGame} />
          <Route path='/' component={SoloGame}/> 

        </Switch> 
      </div>

    
    </BrowserRouter> 

  )
}

export default App
