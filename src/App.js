import React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";

import Login from './login/Login';
import Layout from './Layout';

const App = () => {
  // 세션에 권한이 있어야 본문에 접속 가능
  // 권한 없을 시 URL 접근하면 Login으로 강제 이동
  let isAuthorized = sessionStorage.getItem("isAuthorized");

  return (
    <BrowserRouter>
      {!isAuthorized ? <Redirect to = "/login"/> : <Redirect to = "/"/>}
      <Switch>
        <Route exact path = "/login" component = {Login}/>
        <Route exact path = "/" component = {Layout}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
