import React from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles"
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({

  title: {
    letterSpacing: theme.spacing(0.4)
  },
}))

const Nav = () => {
  const classes = useStyles();

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
          <li className="nav-item">
            <Link to="/login" className="nav-link">ログイン</Link>
          </li>
          <li className="nav-item">
            <Link to="/signup" className="nav-link">新規登録</Link>
          </li>
          <li className="nav-item">
            <a href="/public" className="nav-link">公開する</a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Nav