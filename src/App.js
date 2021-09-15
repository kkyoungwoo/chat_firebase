import React, { useEffect } from 'react';
import { Switch, Route,useHistory } from 'react-router-dom';

import ChatPage from './components/ChatPage/ChatPage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'

import firebase from './firebase';

function App() {

  let history = useHistory()

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user)
      //로그인이 된 상태
      if(user){
        history.push("/")
      }else{
        //로그인이 되지 않은 상태
        history.push("/loginpage")
      }
    })
  }, [])

  return (
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/loginpage" component={LoginPage} />
        <Route exact path="/registerpage" component={RegisterPage} />
      </Switch>
  )
}

export default App;
