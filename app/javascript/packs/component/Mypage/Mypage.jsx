import React from 'react'
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import axios from "axios";

import {
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar
} from '@material-ui/core';
import MenuIcon from "@material-ui/icons/Menu";

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useEffect, useState } from 'react';

import Profile from "./Profile";
import UploadAvatar from "./Upload-Avatar";
import ResetPassword from "./ResetPassword";
import Logout from "./Logout";
import MyPortfolios from "./MyPortfolios";
import Portfolio from "../Portfolio/Portfolio"

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  avatar: {
    width: "10rem",
    height: "10rem",
    fontSize: "4.5rem",
    margin: "18px auto"
  }
}));

const Mypage = (props) => {
  const classes = useStyles();
  const { window } = props;
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState(new Object);
  const [getAvatar, setAvatar] = useState(null);
  const [myPortfolios, setMyPortfolios] = useState(new Object);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // string型のデータはデフォルトでnull値(undefinedとして表示されてしまう)のため空文字を設定
  const setEmpty = (response) => {
    for (const key in response.data) {
      if (!response.data[key]) {
        response.data[key] = "";
      }
    }
  }

  useEffect(() => {
    axios.get("/sessions/getCurrentUser")
      .then(response => {
        if (response.statusText === "OK") {
          
          setEmpty(response);
          return response.data;
        }
      })
      .then(data => {
        setUser(data);
        requestAvatar(data.id);
        requestMyPortfolio(data.id);
      })
      .catch(error => console.log(error));

  }, [])

  const requestAvatar = (user_id) => {
    if (user_id) {
      axios.get(`/users/${user_id}/avatarStore`)
        .then(response => {
          if (response.statusText === "OK") {
            setAvatar(response.data);
          }
        });
    }
  }

  const requestMyPortfolio = (user_id) => {
    axios.get(`/myportfolio/${user_id}`)
      .then(res => {
        if (res.statusText === "OK") {
          // console.log(res.data);
          setMyPortfolios(res.data);
        }
      })
      .catch(error => console.log(error));
  }

  const menuIcons = [
    <AccountCircleIcon />,
    <PhotoCameraIcon />,
    <LockOpenIcon />,
    <ExitToAppIcon />
  ]

  const portfolioIcons = [
    <LibraryBooksIcon />,
  ]

  const menuRouteLists = [
    { 'プロフィール': "/profile" },
    { '写真': "/upload-avatar"},
    { 'パスワード': "/reset-password"},
    { 'ログアウト': "/logout" }
  ]

  const portfolioRouteLists = [
    { 'マイポートフォリオ': "/mypage/my-portfolios" }
  ]

  const initialName = () => {
    const str = user.nickname;
    if (str) {
      return str.charAt(0);
    }
  }

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <a href="/"
          style={{ fontSize: "1.2rem", margin: "8px", display: "inline-block", color: "#333" }}>
          トップへ戻る
        </a>
        {getAvatar ?
          <Avatar src={getAvatar} className={classes.avatar} />
          :
          <Avatar className={classes.avatar}>{initialName()}</Avatar>
        }
        <Typography variant="h5" className="text-center mb-3">{user.nickname}</Typography>
      </div>
      <Divider />
      <List>
        {menuRouteLists.map((text, index) => (
          <Link to={`/mypage${Object.values(text)}`} className="mypage-menu-btn" key={Object.keys(text)}>
            <ListItem button>
              <ListItemIcon>{menuIcons[index]}</ListItemIcon>
              <ListItemText
                primary={Object.keys(text)}
                style={{color: "#333"}}
              />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {portfolioRouteLists.map((text, index) => (
          <Link to={`${Object.values(text)}`}
            className="mypage-menu-btn" key={Object.keys(text)}>
            <ListItem button>
              <ListItemIcon>{portfolioIcons[index]}</ListItemIcon>
              <ListItemText
                primary={Object.keys(text)}
                style={{color: "#333"}}
              />
            </ListItem>
          </Link>
        ))}
        <a href="/public" className="mypage-menu-btn">
          <ListItem button>
            <ListItemIcon>
              <CloudUploadIcon />
            </ListItemIcon>
            <ListItemText
              primary="ポートフォリオ公開"
              style={{color: "#333"}}
            />
          </ListItem>
        </a>
      </List>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Router>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar style={{height: "80px"}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h4" className="m-auto font-weight-bold" noWrap>
                <Switch>
                  <Route exact path="/mypage">
                      プロフィール編集
                  </Route>
                  <Route exact path="/mypage/profile">
                      プロフィール編集
                  </Route>
                  <Route path="/mypage/upload-avatar">
                      写真
                  </Route>
                  <Route path="/mypage/reset-password">
                      パスワード変更
                  </Route>
                  <Route path="/mypage/logout">
                      ログアウト
                  </Route>
                  <Route path="/mypage/my-portfolios">
                      マイポートフォリオ
                  </Route>
                  <Route path="/mypage/my-portfolio/:id">
                      作品プレビュー
                  </Route>
                </Switch>
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route path="/mypage" exact component={() => <Profile user={user} />} />
            <Route path="/mypage/profile" component={() => <Profile user={user} />} />
            <Route path="/mypage/upload-avatar" component={() => <UploadAvatar user={user} avatar={getAvatar} />} />
            <Route path="/mypage/reset-password" component={() => <ResetPassword user={user} />} />
            <Route path="/mypage/logout" component={() => <Logout user={user} />} />
            <Route path="/mypage/my-portfolios" component={() => <MyPortfolios portfolios={myPortfolios} />} />
            <Route path="/mypage/my-portfolio/:id" component={Portfolio} />
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default Mypage