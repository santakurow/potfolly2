import React, { useEffect, useState } from 'react'
import { Typography, makeStyles } from "@material-ui/core"
import Nav from "../Header/Nav"
import CategoryNav from "../Category/CategoryNav"
import PortfoliosList from "../Portfolio/PortfoliosList"

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "100vh"
  },
  notImg: {
    height: "180px",
    fontSize: "3rem",
    color: "rgba(0, 0, 0, 0.5)",
    transform: "rotate(10deg)"
  }
}));

const Categories = (props) => {

  const classes = useStyles();

  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  useEffect(() => {
    switch (props.match.url) {
      case "/portfolios/web-dev":
        setCategoryName("Web開発");
        setCategoryId(1);
        break;
      case "/portfolios/mobile-app":
        setCategoryName("モバイルアプリ");
        setCategoryId(2);
        break;
      case "/portfolios/data-science":
        setCategoryName("データサイエンス");
        setCategoryId(3);
        break;
      case "/portfolios/game-dev":
        setCategoryName("ゲーム開発");
        setCategoryId(4);
        break;
      case "/portfolios/design":
        setCategoryName("デザイン");
        setCategoryId(5);
        break;
      case "/portfolios/graphic":
        setCategoryName("グラフィック");
        setCategoryId(6);
        break;
      case "/portfolios/animation":
        setCategoryName("アニメーション");
        setCategoryId(7);
        break;
    }
  }, [])

  return (
    <div>
      <Nav />
      <CategoryNav />
      <div className={`container py-5 ${classes.root}`}>
        <Typography variant="h4">{`カテゴリ「${categoryName}」一覧`}</Typography>
        {categoryId !== 0 ?
          <PortfoliosList url={`/portfolios/category/${categoryId}`} style={classes} />
          :
          <></>
        }
      </div>
    </div>
  )
}

export default Categories