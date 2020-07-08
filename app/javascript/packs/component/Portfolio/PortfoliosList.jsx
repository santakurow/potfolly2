import React, { useState, useEffect } from 'react'
import { Typography, Card, CardActionArea, CardContent, CardMedia } from "@material-ui/core"
import { Link } from "react-router-dom"
import axios from "axios"

const PortfoliosList = (props) => {
  const [portfolios, setPortfolios] = useState(new Array);


  useEffect(() => {
    const url = props.url;
    axios.get(url).then(response => {
      if (response.statusText === "OK") {
        setPortfolios(response.data);
      }
    })
  }, [])

  return (
    <div className="row mt-3">
      {portfolios.map((portfolio, i) => (
        <div className="col-md-6 col-lg-4 mb-4" key={i}>
          <Link to={`/portfolio/${portfolio.id}`} className="mypage-menu-btn">
            <Card>
              <CardActionArea style={{background: "#f0f0f0"}}>
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
                    ${props.style.notImg}`}
                  >No Photo</CardMedia>
                }
                <CardContent className="border-top bg-white">
                  <Typography gutterBottom variant="h5" component="h2">
                  {portfolio.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" component="p" style={{ height: "1.2rem", overflow: "hidden", whiteSpace: "pre-line" }}>
                  {portfolio.desc}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </div>
      ))}
      {!portfolios.length && props.current !== "/portfolios/search" ? <p>まだポートフォリオが公開されてません</p> : <></>}
      {!portfolios.length && props.current === "/portfolios/search" ? <p>該当のポートフォリオが見つかりませんでした。</p> : <></>}
    </div>
  )
}

export default PortfoliosList