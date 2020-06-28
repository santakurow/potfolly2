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
import EditMailPass from "./Edit-Mail-Pass";

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };


  useEffect(() => {
    axios.get("/sessions/restore")
      .then(response => {
        if (response.statusText === "OK") {
          // string型のデータはデフォルトでnull値(undefinedとして表示されてしまう)のため空文字を設定
          for (const key in response.data) {
            if (!response.data[key]) {
              response.data[key] = "";
            }
          }
          return response.data;
        }
      })
      .then(data => {
        setUser(data);
      })
      .catch(error => console.log(error));

  }, [])

  useEffect(() => {
    if (user.id) {
      axios.get(`/users/${user.id}/avatarStore`)
        .then(response => {
          if (response.statusText === "OK") {
            setAvatar(response.data);
          }
        });
    }
  })

  const menuIcons = [
    <AccountCircleIcon />,
    <PhotoCameraIcon />,
    <LockOpenIcon />,
    <ExitToAppIcon />
  ]

  const portfolioIcons = [
    <LibraryBooksIcon />,
    <CloudUploadIcon />
  ]

  const menuRouteLists = [
    { 'プロフィール': "/profile" },
    { '写真': "/upload-avatar"},
    { 'メール・パスワード': "/edit-mail-pass"},
    { 'ログアウト': "/logout" }
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
        {["マイポートフォリオ", "ポートフォリオ公開"].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>{portfolioIcons[index]}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
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
                  <Route path="/mypage/edit-mail-pass">
                      メールアドレス・パスワード変更
                  </Route>
                  <Route path="/mypage/logout">
                      ログアウト
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
            <Route path="/mypage/edit-mail-pass" component={() => <EditMailPass user={user} />} />
            <Route path="/mypage/logout">
              <h1>logout</h1>
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  )
}

export default Mypage