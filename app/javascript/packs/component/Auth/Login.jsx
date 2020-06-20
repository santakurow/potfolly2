import React from 'react'
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';
import { Dialog, Button, DialogTitle, DialogActions, TextField } from '@material-ui/core';
import Alert from "@material-ui/lab/Alert";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: "5rem"
  },
  formFiled: {
    width: "300px",
    marginBottom: "18px"
  }
}));

const Login = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleLogin = (e) => {
    e.preventDefault();
    const url = "/sessions"
    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      session: {
        email: email,
        password: password
      }
    };
    const config = {
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    }
    axios.post(url, data, config)
      .then(response => {
        if (response.statusText === "OK") {
          return response.data
        }
      })
      .then(response => {
        if (typeof response === "object") {
          location.href = "/";
        }
        else {
          setError(response);
        }
        
      })
      .catch(error => console.log(error));
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <a href="/login" className="nav-link" role="button" onClick={e => e.preventDefault()}>ログイン</a>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-title" className="text-center">
        <DialogTitle id="form-title">ログイン</DialogTitle>
        <form className="mx-3" onSubmit={handleLogin}>
          {error !== "" ?
            <Alert severity="warning" className="mb-2">{error}</Alert>
            :
            <></>
          }
          <div className="form-group">
            <TextField
              label="メールアドレス"
              type="email"
              name="email"
              className={classes.formFiled}
              onChange={e => setEmail(e.target.value)}
              />
          </div>
          <div className="form-group mb-3">
            <TextField
              label="パスワード"
              type="password"
              name="password"
              className={classes.formFiled}
              onChange={e => setPassword(e.target.value)}
              />
          </div>
          <DialogActions>
            <Button onClick={handleClose}>
              キャンセル
            </Button>
            <Button variant="contained" type="submit" color="primary">ログイン</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default Login