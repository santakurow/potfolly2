import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
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
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const url = "/sessions/getCurrentUser";
    axios.get(url).then(response => {
      if (response.statusText === "OK") {
        setCurrentUser(response.data);
      }
    })
      .catch(error => console.log(error));
  }, [])

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword && keyword.trim()) {
      location.href = `/portfolios/search?${keyword}`;
    }
  }

  const deleteFlashMessage = () => {
    const flash_msg = document.getElementById("flash-msg");
    if (flash_msg) {
      flash_msg.style.display = "none";
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light"
      style={{ background: "#3f51b5" }}>
      <a href="/" className={`navbar-brand mb-0 h1 font-weight-bold logo-title ${classes.title}`}
      style={{color: "white"}}>Potfolly</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <form className="form-inline my-2 my-lg-0" id="nav-form" onSubmit={handleSearch}>
          <input className="form-control mr-sm-2 form-search" type="search" placeholder="作品を検索" aria-label="search"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <button className="btn btn-outline-success my-sm-0" type="submit"
          ><SearchIcon fontSize="small" /></button>
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
                  <Link to="/public" className="nav-link" style={{color: "white"}} onClick={deleteFlashMessage}>公開する</Link>
                </Button>
              </li>
              <li className="nav-item">
                <Button>
                  <Link to="/mypage/" className="nav-link" style={{color: "white"}} onClick={deleteFlashMessage}>マイページ</Link>
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