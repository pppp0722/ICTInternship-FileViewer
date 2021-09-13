import React from 'react';
import styled from 'styled-components';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import Login from './Login';
import Home from './Home';

const App = () => {
  let isAuthorized = sessionStorage.getItem("isAuthorized");

  const Wrapper = styled.div`
    display: flex;
    justify-content: center;
  `;

  return (
    <BrowserRouter>
      <Wrapper>
        {!isAuthorized ? <Redirect to = "/"/> : <Redirect to = "/home"/>}
        <Switch>
          <Route exact path = "/" component = {Login}/>
          <Route exact path = "/home" component = {Home}/>
        </Switch>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
