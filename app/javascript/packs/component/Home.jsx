import React from 'react'

import Jumbotron from "./Jumbotron"
import Nav from './Header/Nav'
import Categories from "./Category/Categories"
import Portfolios from "./Portfolio/Portfolios"

import axios from "axios"
import { useState, useEffect } from 'react'

const Home = () => {
  const [logged_in, setLog] = useState(false);
  const url = "/sessions/restore"

  useEffect(() => {
    axios.get(url).then(res => {
      if (res.statusText === "OK") {
        if (res.data) {
          setLog(true);
        }
      }
    })
  }, [])
  return (
    <div>
      <Nav />
      <Categories />
      {logged_in ? <>{/* Not component */}</> : <Jumbotron />}
      <div style={{ background: "#f0f0f0" }}>
        <Portfolios />
      </div>
      
    </div>
  )
}

export default Home