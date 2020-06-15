import React from 'react'
import { makeStyles } from "@material-ui/core/styles"
import { Typography, Button } from '@material-ui/core';
import LinkTo from "@material-ui/core/Link";
import { Web, Smartphone, Assessment, SportsEsports, Category, Brush, EmojiNature } from '@material-ui/icons/';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    padding: "0 20px",
    fontSize: "16px",
    justifyContent: "center",
    "& > *": {
      // flex: "0 1 30%"
    }
  },
  cateButton: {
    padding: "10px 20px"
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
    { "グラフィック": "graphic" },
    { "3D・アニメーション": "animation" }
  ];

  const category_icons = [
    <Web />,
    <Smartphone />,
    <Assessment />,
    <SportsEsports />,
    <Brush />,
    <Category />,
    <EmojiNature />
  ];

  return (
    <div className={classes.root} id="category">
      {categories.map((category, i) => (
        <Typography key={Object.values(category)} className={`px-4`}>
          <Button className={classes.cateButton}>
            <LinkTo
              href={`/portfolios/${Object.values(category)}`}
              color="inherit"
              underline="none"
              className="linkhover-style">
              {category_icons[i]}
              {Object.keys(category)}
            </LinkTo>
          </Button>
        </Typography>
      ))}
    </div>
  )
}

export default Categories