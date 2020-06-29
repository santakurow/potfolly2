import React, { useState, useEffect } from 'react'
import { Button, Typography, FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';
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
  const [errors, setErrors] = useState(null);
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");

  const [isDisable, setIsDisable] = useState(false);

  const resetErrors = () => {
    setIsNicknameError(false);
    setIsEmailError(false);
    setIsPasswordError(false);
    setNicknameErrorMessage("");
    setEmailErrorMessage("");
    setPasswordErrorMessage("");
    
  }
  
  useEffect(() => {

    resetErrors();
    
    if (errors) {
      
      Object.keys(errors).map(error => {
        switch (error) {
          case "nickname":
            setIsNicknameError(true);
            setNicknameErrorMessage(errors["nickname"]);
            console.log(errors["nickname"]);
            break;
          case "email":
            setIsEmailError(true);
            setEmailErrorMessage(errors["email"]);
            break;
          case "password":
            setIsPasswordError(true);
            setPasswordErrorMessage(errors["password"]);
            break;
        }
      })
    }
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDisable(true);

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
          
          return response.data
        }
        throw new Error("network error")
      })
      .then(data => {
        if (data.error) {
          setIsDisable(false);
          setErrors(data);
        }
        else {
          location.href = "/"
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div className={`container text-center ${classes.root}`}>
      <Typography variant="h4">ユーザー登録</Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off">
        <div className="form-group">
          <FormControl error={isNicknameError} >
            <InputLabel htmlFor="nickname">ニックネーム</InputLabel>
            <Input
              id="nickname"
              className={`${classes.formFiled}`}
              type="text"
              name="nickname"
              onChange={e => { setNickname(e.target.value) }}
              aria-describedby="nickname-text"
            />
            <FormHelperText id="nickname-text">{Object.values(nicknameErrorMessage).map(msg => (
              <li key={msg}>{msg}</li>
            ))}</FormHelperText>
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl error={isEmailError}>
            <InputLabel htmlFor="email">メールアドレス</InputLabel>
            <Input
              id="email"
              className={`${classes.formFiled}`}
              type="email"
              name="email"
              onChange={e => { setEmail(e.target.value) }}
              aria-describedby="email-text"
            />
            <FormHelperText id="email-text">{Object.values(emailErrorMessage).map(msg => (
              <li key={msg}>{msg}</li>
            ))}
            </FormHelperText>
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl error={isPasswordError}>
            <InputLabel htmlFor="password">パスワード(６文字以上)</InputLabel>
            <Input
              id="password"
              className={`${classes.formFiled}`}
              type="password"
              name="password"
              onChange={e => { setPassword(e.target.value) }}
              aria-describedby="password-text"
              autoComplete="new-password"
            />
            <FormHelperText id="password-text">{Object.values(passwordErrorMessage).map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}</FormHelperText>
          </FormControl>
        </div>
        <div className="form-group">
          <FormControl error={isPasswordError}>
            <InputLabel htmlFor="password-confirmation">パスワード(確認)</InputLabel>
            <Input
              id="password-confirmation"
              className={`${classes.formFiled}`}
              type="password"
              name="password_confirmation"
              onChange={e => { setPasswordConfirmation(e.target.value) }}
              aria-describedby="password-confirmation-text"
            />
            <FormHelperText id="password-confirmation-text">{Object.values(passwordErrorMessage).map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}</FormHelperText>
          </FormControl>
        </div>
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={isDisable}
        >
          登録
          </Button>
      </form>
      <Link to="/" className="mt-2">戻る</Link>
    </div>
  )
}

export default Signup