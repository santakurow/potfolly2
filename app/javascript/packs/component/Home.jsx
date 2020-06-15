import React from 'react'
import Jumbotron from "./Jumbotron"
import Nav from './Header/Nav'
import Categories from "./Category/Categories"

const Home = () => {
  return (
    <div>
      <Nav />
      <Categories />
      <Jumbotron />
    </div>
  )
}

export default Home