import React, { useState } from 'react'
import { Button, Typography, TextField } from '@material-ui/core';
import { Link } from "react-router-dom"
import { makeStyles } from "@material-ui/core/styles";
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

const Signup = () => {
  const classes = useStyles();

  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = "/users";
    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content")
    const data = {
      user: {
        nickname: nickname,
        email: email,
        password: password,
        password: password_confirmation
      }
    };
    const config = {
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    };

    axios.post(url, data, config)
      .then(response => {
        if (response.statusText === "OK") {
          console.log(response.data)
        }
      })
      .catch(error => console.log("Error: ", error));
  }

  return (
    <div className={`container text-center ${classes.root}`}>
      <Typography variant="h4">ユーザー登録</Typography>
      <form onSubmit={handleSubmit} >
        <div className="form-group">
          <TextField
            label="ニックネーム"
            className={`${classes.formFiled}`}
            type="text"
            name="nickname"
            onChange={ e => { setNickname(e.target.value) }}
          />
        </div>
        <div className="form-group">
          <TextField
            label="メールアドレス"
            className={`${classes.formFiled}`}
            type="email"
            name="email"
            onChange={e => { setEmail(e.target.value) }}
          />
        </div>
        <div className="form-group">
          <TextField
            label="パスワード(６文字以上)"
            className={`${classes.formFiled}`}
            type="password"
            name="password"
            onChange={e => { setPassword(e.target.value) }}
          />
        </div>
        <div className="form-group">
          <TextField
            label="パスワード（確認）"
            className={`${classes.formFiled}`}
            type="password"
            name="password_confirmation"
            onChange={e => { setPasswordConfirmation(e.target.value) }}
          />
        </div>
        <Button variant="contained" type="submit" color="primary">登録</Button>
      </form>
      <Link to="/" className="mt-2">戻る</Link>
    </div>
  )
}

export default Signup