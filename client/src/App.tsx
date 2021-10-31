import React from 'react';
import GoogleButton from 'react-google-button';
import {  Switch, Route, Link } from 'react-router-dom';

import styled from 'styled-components'
 

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 31px;
`;

const App: React.FC = () => {
  return (
    <AppContainer>
      <div className="container">
        <Switch>
          <Route path="/"  exact>
            Welcome Home!, 
            <Link to=''>Login</Link>
          </Route>
          <Route path='/login' exact>
            <GoogleButton />
          </Route>
          <Route>
            <h1>Erro Login, Please try agian later!</h1>
          </Route>
        </Switch>
      </div>
    </AppContainer>
  )
}

export default App
