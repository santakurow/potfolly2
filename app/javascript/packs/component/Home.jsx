import React from 'react'
import Jumbotron from "./Jumbotron"
import Nav from './Header/Nav'
import Categories from "./Category/Categories"
import axios from "axios"
import { useState } from 'react'

const Home = () => {
  const [logged_in, setLog] = useState(false);
  const url = "/sessions/restore"
  axios.get(url).then(res => {
    if (res.statusText === "OK") {
      setLog(true);
    }
  })
  return (
    <div>
      <Nav />
      <Categories />
      {logged_in ? <>{/* Not component */}</> : <Jumbotron /> }
    </div>
  )
}

export default Home