import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import Login from './Login';
import Layout from './Layout';

const App = () => {
  // 인증 session 있으면 Layout.js로, 없으면 Login.js로 이동
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
