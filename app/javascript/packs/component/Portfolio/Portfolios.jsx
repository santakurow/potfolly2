import React from 'react'
import { Typography, makeStyles } from "@material-ui/core"
import PortfoliosList from "./PortfoliosList"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh"
  },
  notImg: {
    height: "180px",
    fontSize: "3rem",
    color: "rgba(0, 0, 0, 0.5)",
    transform: "rotate(10deg)",
  }
}));

const Portfolios = () => {

  const classes = useStyles();

  
  return (
    <div className={`container py-5 ${classes.root}`}>
      <Typography variant="h4">新着作品</Typography>
      <PortfoliosList url="/portfolios" style={classes} />
      <hr />
      <Typography variant="h4">Web開発</Typography>
      <PortfoliosList url={`/portfolios/category/${1}`} style={classes} />
      <hr />
      <Typography variant="h4">モバイルアプリ</Typography>
      <PortfoliosList url={`/portfolios/category/${2}`} style={classes} />
      <hr />
      <Typography variant="h4">データサイエンス</Typography>
      <PortfoliosList url={`/portfolios/category/${3}`} style={classes} />
      <hr />
      <Typography variant="h4">ゲーム開発</Typography>
      <PortfoliosList url={`/portfolios/category/${4}`} style={classes} />
      <hr />
      <Typography variant="h4">デザイン</Typography>
      <PortfoliosList url={`/portfolios/category/${5}`} style={classes} />
      <hr />
      <Typography variant="h4">グラフィック</Typography>
      <PortfoliosList url={`/portfolios/category/${6}`} style={classes} />
      <hr />
      <Typography variant="h4">3D・アニメーション</Typography>
      <PortfoliosList url={`/portfolios/category/${7}`}style={classes} />

    </div>
  )
}

export default Portfolios