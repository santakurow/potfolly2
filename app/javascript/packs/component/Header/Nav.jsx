import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import Signup from "../Auth/Signup";
import Login from "../Auth/Login";
import axios from "axios";

const useStyles = makeStyles((theme) => ({

  title: {
    letterSpacing: theme.spacing(0.4),
    color: "white"
  },
  
}))

const Nav = () => {
  const classes = useStyles();

  const [current_user, setCurrentUser] = useState(null);

  useEffect(() => {
    const url = "/sessions/getCurrentUser";
    axios.get(url).then(response => {
      if (response.statusText === "OK") {
        setCurrentUser(response.data);
      }
    })
      .catch(error => console.log(error));
  }, [])

  return (
    <nav className="navbar navbar-expand-lg"
      style={{ background: "#3f51b5" }}>
      <a href="/" className={`navbar-brand mb-0 h1 font-weight-bold logo-title ${classes.title}`}>Potfolly</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline my-2 my-lg-0 " id="nav-form">
          <input className="form-control mr-sm-2 form-search" type="search" placeholder="作品を検索" aria-label="search" />
          <button className="btn btn-outline-success my-sm-0" type="submit"><SearchIcon fontSize="small" /></button>
        </form>
        <ul className="navbar-nav ml-auto">
          {!current_user ?
            <>
              <li className="nav-item">
                <Login />
              </li>
              <li className="nav-item">
                <Signup />
              </li>
            </>
            :
            <>
              <li className="nav-item">
                <Button>
                  <NavLink to="/public" className="nav-link" style={{color: "white"}}>公開する</NavLink>
                </Button>
              </li>
              <li className="nav-item">
                <Button>
                  <NavLink to="/mypage/" className="nav-link" style={{color: "white"}}>マイページ</NavLink>
                </Button>
              </li>
            </>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Nav