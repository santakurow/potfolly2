import React, { useEffect, useState } from 'react'
import Nav from "../Header/Nav"
import CategoryNav from "../Category/CategoryNav"
import { Paper, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import axios from "axios"
import API from "../../api"
import { Link } from 'react-router-dom'

const useStyle = makeStyles(() => ({
  
  image: {
    width: "100%",
    height: "300px",
    objectFit: "cover",
    textAlign: "center",
    fontWeight: "bold",
    lineHeight: "300px",
    background: "#f0f0f0",
    overflow: "hidden"
  }
}))

const Portfolio = (props) => {

  const classes = useStyle();

  const [getPortfolio, setPortfolio] = useState(new Object);
  const [getImage, setImage] = useState(null);
  const [getUser, setUser] = useState(new Object);
  const [getCurrentUser, setCurrentUser] = useState(new Object);

  useEffect(() => {
    const { match: { params: { id } } } = props;
    console.log(props);
    axios.get(`/portfolio/${id}/detail`)
      .then(response => {
        if (response.statusText === "OK") {
          console.log(response.data);
          setPortfolio(response.data);
          requestImage(response.data.id);
          requestUser(response.data.user_id);
          requestCurrentUser();
      }
    })
  }, [])

  const requestImage = (portfolio_id) => {
    axios.get(`/portfolio/${portfolio_id}/getImage`)
      .then(response => {
        if (response.statusText === "OK") {
          setImage(response.data);
      }
    })
  }
  
  const requestUser = (user_id) => {
    axios.get(`/user_portfolio/${user_id}`)
      .then(response => {
        if (response.statusText === "OK") {
          setUser(response.data);
      }
    })
  }

  const requestCurrentUser = () => {
    axios.get(`/sessions/getCurrentUser`).then(response => {
      if (response.statusText === "OK") {
        setCurrentUser(response.data);
      }
    })
  }

  const handleDelete = () => {
    const url = `/portfolio/${getPortfolio.id}`;
    API.delete(url).then(response => {
      if (response.statusText === "OK") {
        if (response.data === null) {
          location.href = "/";
        }
      }
    })
  }

  const detail = (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <Typography variant="h4" className="mb-4">{getUser.nickname}さんの作品</Typography>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 col-lg-6">
          <Paper elevation={3} className="mb-3">
            {getImage ?
              <img src={getImage} className={classes.image} /> :
              <Typography variant="h1" className={classes.image}>No Photo</Typography>
            }
          </Paper>
        </div>
        <div className="col-md-12 col-lg-6">
          <Typography variant="h3" className="font-weight-bold">
            {getPortfolio.title}
          </Typography>
          <Typography variant="h4" className="mt-2">
            <a href={getPortfolio.url}>{getPortfolio.url}</a>
          </Typography>
          <Typography variant="h5" className="mt-3" style={{color: "gray", whiteSpace: "pre-line"}}>
            {getPortfolio.desc}
          </Typography>
        </div>
        {(getCurrentUser && getCurrentUser.id) === getUser.id ?
          <div className="col-md-12 col-lg-6">
            {props.match.url === `/mypage/my-portfolio/${props.match.params.id}` ?
              <a href={`/my-portfolio/${getPortfolio.id}/edit`} className="mypage-menu-btn">
                <Button variant="contained">
                  編集
                </Button>
              </a>
              :
              <Link to={`/my-portfolio/${getPortfolio.id}/edit`} className="mypage-menu-btn">
                <Button variant="contained">
                  編集
                </Button>
              </Link>
            }
            <Button variant="contained"
              style={{
                backgroundColor: "#f50057",
                color: "white"
              }}
              onClick={handleDelete}
            >
              削除
            </Button>
          </div>
          :
          <>
          </>
        }
      </div>
    </div>
  )

  return (
    <div>
      {props.match.url !== `/mypage/my-portfolio/${props.match.params.id}` ?
        <>
          <Nav />
          <CategoryNav />
          {detail}
        </> :
        <div>
          {detail}
        </div>
      }
    </div>
  )
}

export default Portfolio