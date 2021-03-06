import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Home from './component/Home'
import Signup from './component/Auth/Signup'
import Login from "./component/Auth/Login"
import Public from "./component/Portfolio/Public"
import Mypage from "./component/Mypage/Mypage"
import Portfolio from "./component/Portfolio/Portfolio"
import Edit from "./component/Portfolio/Edit"
import Categories from "./component/Category/Categories"
import Search from "./component/Portfolio/Search"

const Routes = () => {

  const categoryNames = [
    "web-dev",
    "mobile-app",
    "data-science",
    "game-dev",
    "design",
    "graphic",
    "animation"
  ]

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/login" exact component={Login} />
        <Route path="/public" exact component={Public} />
        <Route path="/mypage/" component={Mypage} />

        <Route path="/portfolio/:id" component={Portfolio} />
        <Route path="/my-portfolio/:id/edit" component={Edit} />
        
        {categoryNames.map((categoryName, i) => (
          <Route key={i} path={`/portfolios/${categoryName}`} component={Categories} />
        ))}

        <Route path="/portfolios/search" component={Search} />
      </Switch>
    </Router>
  )
}

export default Routes
