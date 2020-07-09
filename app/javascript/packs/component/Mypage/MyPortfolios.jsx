import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
// import axios from "axios"
import { Typography, Card, CardActionArea, CardMedia, CardContent, Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  notImg: {
    height: "180px",
    fontSize: "3rem",
    color: "rgba(0, 0, 0, 0.5)",
    transform: "rotate(10deg)"
  }
}));

const MyPortfolios = (props) => {

  const classes = useStyles();

  const [portfolios, setPortfolios] = useState(new Array);
  
  useEffect(() => {
    
    if (props.portfolios.length) {
      setPortfolios(props.portfolios);
    }
  }, [])

  return (
    <div className="container">
      <Typography variant="h5" className="mt-3">マイポートフォリオ一覧</Typography>
      <div className="row mt-3">
        {portfolios.map((portfolio, i) => (
          <div className="col-md-6 col-lg-4 mb-4" key={i}>
            <Link to={`/mypage/my-portfolio/${portfolio.id}`} className="mypage-menu-btn">
              <Card>
                <CardActionArea>
                  {portfolio.image ?
                    <CardMedia
                      component="img"
                      alt={`img-${i}`}
                      height="180"
                      image={portfolio.image}
                    />
                    :
                    <CardMedia
                      component="div"
                      className={`d-flex justify-content-center align-items-center 
                      font-weight-bold
                      ${classes.notImg}`}
                    >No Photo</CardMedia>
                  }
                  <CardContent className="border-top">
                    <Typography gutterBottom variant="h5" component="h2">
                    {portfolio.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      style={{height: "2rem", overflow: "hidden"}}
                    >
                    {portfolio.desc}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyPortfolios