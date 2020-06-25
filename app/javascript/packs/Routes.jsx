import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './component/Home'
import Signup from './component/Auth/Signup'
import Login from "./component/Auth/Login"
import Public from "./component/Portfolio/Public"
import Mypage from "./component/Mypage/Mypage"

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route path="/public" exact component={Public} />
      <Route path="/mypage/" component={Mypage} />
    </Switch>
  </Router>
)
