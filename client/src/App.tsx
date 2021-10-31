import axios from 'axios';
import React from 'react';
import GoogleButton from 'react-google-button';
import {  Switch, Route, Link } from 'react-router-dom';

import styled from 'styled-components'
import { Success } from './containers/index';
 

const AppContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 31px;
`;

const App: React.FC = () => {
  
  const fetchAuthUser = async () => {
    const response = await axios.get('http://localhost:5000/api/v1/auth/user', {withCredentials: true});

    if(response && response.data){
      console.log('User : ', response.data )
    }
  }

  const redirectToGoogleSSO = async () => {
    let timer: NodeJS.Timeout | null = null;
    const googleLoginUrl = 'http://localhost:5000/api/v1/login/google'
    const newWindow = window.open(googleLoginUrl, '_blank', "width=400,height=500");

    if(newWindow){
      timer = setInterval(()=>{
        if(newWindow.closed){
          console.log("Yep we're authenticated");
          fetchAuthUser()
          if(timer){
            clearInterval(timer)
          }
        }
      }, 5000)
    }
  }
  
  
  return (
    <AppContainer>
        <Switch>
          <Route path="/"  exact>
            Welcome Home!, 
            <Link to='/login'>Login</Link>
          </Route>
          <Route path='/login' exact>
            <GoogleButton onClick={redirectToGoogleSSO} />
          </Route>
          <Route path='/login/success' component={Success} />
          <Route path='/login/error'>
            <h1>Erro Login, Please try agian later!</h1>
          </Route>
          <Route path='*'>
            <h1>Nof Found</h1>
          </Route>

        </Switch>
    </AppContainer>
  )
}

export default App
