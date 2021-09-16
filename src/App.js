import React, { useEffect } from 'react';
import { Switch, Route,useHistory } from 'react-router-dom';

import ChatPage from './components/ChatPage/ChatPage'
import LoginPage from './components/LoginPage/LoginPage'
import RegisterPage from './components/RegisterPage/RegisterPage'

import firebase from './firebase';

import { useDispatch, useSelector } from 'react-redux'

import {setUser} from './redux/actions/user_action';

function App() {

  let history = useHistory()
  let dispatch = useDispatch()
  const isLoading = useSelector(state => state.user.isLoading)


  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log('user', user)
      //로그인이 된 상태
      if(user){
        history.push("/")
        dispatch(setUser(user))
      }else{
        //로그인이 되지 않은 상태
        history.push("/loginpage")
      }
    })
  }, [])

  if(isLoading){
    return(
      <div>로딩중입니다.</div>
    )
  }else{
    return (
      <Switch>
        <Route exact path="/" component={ChatPage} />
        <Route exact path="/loginpage" component={LoginPage} />
        <Route exact path="/registerpage" component={RegisterPage} />
      </Switch>
    ) 
  }
}

export default App;
