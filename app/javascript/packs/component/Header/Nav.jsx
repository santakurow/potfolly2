import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import SearchIcon from '@material-ui/icons/Search';
import { Button } from '@material-ui/core';
import Login from "../Auth/Login";
import axios from "axios";

const useStyles = makeStyles((theme) => ({

  title: {
    letterSpacing: theme.spacing(0.4)
  },
}))

const Nav = () => {
  const classes = useStyles();

  const [current_user, setCurrentUser] = useState(null);
  const [logged_in, setLoggedIn] = useState(false);

  useEffect(() => {
    const url = "/sessions/restore";
    axios.get(url).then(response => {
      if (response.statusText === "OK") {
        setCurrentUser(response.data);
        setLoggedIn(true);
      }
    })
      .catch(error => console.log(error));
    
  }, [])

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a href="/" className={`navbar-brand mb-0 h1 font-weight-bold ${classes.title}`}>Potfolly</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline my-2 my-lg-0 " id="nav-form">
          <input className="form-control mr-sm-2 form-search" type="search" placeholder="ポートフォリオを検索" aria-label="search" />
          <button className="btn btn-outline-success my-sm-0" type="submit"><SearchIcon fontSize="small" /></button>
        </form>
        <ul className="navbar-nav ml-auto">
          {!logged_in ?
            <>
              <li className="nav-item">
                <Login />
              </li>
              <li className="nav-item">
                <Button>
                  <Link to="/signup" className="nav-link">新規登録</Link>
                </Button>
              </li>
            </>
            :
            <li className="nav-item">
              <Button>
                <Link to="/public" className="nav-link">公開する</Link>
              </Button>
            </li>
          }
        </ul>
      </div>
    </nav>
  )
}

export default Nav