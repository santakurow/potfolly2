import React, { useEffect, useState } from 'react'
import { Typography, makeStyles } from "@material-ui/core"
import PortfoliosList from "./PortfoliosList"
import Nav from "../Header/Nav"
import CategoryNav from "../Category/CategoryNav"

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


const Search = (props) => {

  const classes = useStyles();

  const [keyword, setKeyword] = useState("");
  const current = props.match.path;

  useEffect(() => {
    
    const str = props.location.search;
    let keyword = str.replace("?", "");
    setKeyword(keyword);
  }, [])
  
  return (
    <div>
      <Nav />
      <CategoryNav />
      <div className={`container py-5 ${classes.root}`}>
      <Typography variant="h4">「{decodeURI(keyword)}」の検索結果</Typography>
        {keyword ? <PortfoliosList current={current} url={`/search/${keyword}`} style={classes} /> : <></> }
      </div>
    </div>
  )
}

export default Search