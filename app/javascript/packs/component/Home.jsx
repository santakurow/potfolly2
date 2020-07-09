import React from 'react'

import Jumbotron from "./Jumbotron"
import Nav from './Header/Nav'
import CategoryNav from "./Category/CategoryNav"
import Portfolios from "./Portfolio/Portfolios"

import axios from "axios"
import { useState, useEffect } from 'react'

const Home = () => {
  const [logged_in, setLog] = useState(false);
  const url = "/sessions/getCurrentUser"

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
      <CategoryNav />
      {logged_in ? <></> : <Jumbotron />}
      <div style={{ background: "" }}>
        <Portfolios />
      </div>
      
    </div>
  )
}

export default Home