import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Button } from '@material-ui/core';
import LinkTo from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "0 10px",
    fontSize: "16px",
    "& > *": {
      flexGrow: 1,
    }
  },
  cateButton: {
    padding: "10px"
  }
  

}))

const Categories = () => {
  const classes = useStyles();
  
  const categories = [
    { "WEB開発": "web-dev" },
    { "モバイルアプリ": "mobile-app" },
    { "データサイエンス": "data-science" },
    { "ゲーム開発": "game-dev" },
    { "デザイン": "design" },
    { "グラフィックス": "graphic" },
    { "3D・アニメーション": "animation" }
  ];

  return (
    <div className={classes.root}>
      {categories.map(category => (
        <Typography key={Object.values(category)} className={`px-4`}>
          <Button className={classes.cateButton}>
            <LinkTo
              href={`/portfolios/${Object.values(category)}`}
              color="inherit"
              underline="none"
              className="linkhover-style">
              {Object.keys(category)}
            </LinkTo>
          </Button>
        </Typography>
      ))}
    </div>
  )
}

export default Categories