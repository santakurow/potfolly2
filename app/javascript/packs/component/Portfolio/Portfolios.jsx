import React, { useState, useEffect } from 'react'
import { Typography, Card, CardActionArea, CardContent, CardMedia, makeStyles } from "@material-ui/core"
import { Link } from "react-router-dom"
import axios from "axios"

const useStyles = makeStyles((theme) => ({
  
  notImg: {
    height: "180px",
    fontSize: "3rem",
    color: "rgba(0, 0, 0, 0.5)",
    transform: "rotate(10deg)"
  }
}));

const Portfolios = () => {

  const classes = useStyles();

  const [portfolios, setPortfolios] = useState(new Array);

  useEffect(() => {
    axios.get("/portfolios").then(response => {
      if (response.statusText === "OK") {
        setPortfolios(response.data);
      }
    })
  }, [])
  
  return (
    <div className="container py-5">
      <Typography variant="h4">新着作品</Typography>

      <div className="row mt-3">
        {portfolios.map((portfolio, i) => (
          <div className="col-md-6 col-lg-4 mb-4" key={i}>
            <Link to={`/portfolio/${portfolio.id}`} className="mypage-menu-btn">
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
                    <Typography variant="body2" color="textSecondary" component="p">
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

export default Portfolios