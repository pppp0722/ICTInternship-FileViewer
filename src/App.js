import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import Login from './login/Login';
import Layout from './Layout';

const App = () => {

  return (
    <BrowserRouter>
      {!sessionStorage.getItem("isAuthorized") ? <Redirect to = "/login"/> : <Redirect to = "/"/>}
      <Switch>
        <Route exact path = "/login" component = {Login}/>
        <Route exact path = "/" component = {Layout}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
