import React, { useState, useEffect } from 'react'
import { Button, Dialog, DialogTitle, DialogActions, TextField } from '@material-ui/core';
import { makeStyles } from "@material-ui/core/styles";
import API from "../../api"

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
  const [open, setOpen] = useState(false);
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState(null);
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState(new Array);
  const [emailErrorMessage, setEmailErrorMessage] = useState(new Array);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState(new Array);

  const [isDisable, setIsDisable] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
    setErrors("");
  }

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

  const handleSignup = (event) => {
    event.preventDefault();
    setIsDisable(true);

    const url = "/users";
    const data = {
      user: {
        nickname: nickname,
        email: email,
        password: password,
        password: password_confirmation
      }
    };
    API.post(url, data)
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

  const errorMessageList = (error_msg) => {
    if (error_msg) {
      const e = error_msg.map((msg, i) => (
        <li key={i}>{msg}</li>
      ))
      return e;
    }
  }

  return (
    <div>
      <Button onClick={handleOpen}>
        <a href="/signup" className="nav-link"
          role="button"
          onClick={e => e.preventDefault()}
          style={{color: "white"}}
        >ユーザー登録</a>
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-title" className="text-center">
        <DialogTitle id="form-title">ユーザー登録</DialogTitle>
        <form className="mx-3" onSubmit={handleSignup}>
          <div className="form-group">
            <TextField
              error={isNicknameError}
              helperText={errorMessageList(nicknameErrorMessage)}
              label="ニックネーム"
              type="text"
              name="nickname"
              className={classes.formFiled}
              onChange={e => setNickname(e.target.value)}
              
            />
          </div>
          <div className="form-group mb-3">
            <TextField
              error={isEmailError}
              helperText={errorMessageList(emailErrorMessage)}
              label="メールアドレス"
              type="email"
              name="email"
              className={classes.formFiled}
              onChange={e => setEmail(e.target.value)}
              />
          </div>
          <div className="form-group mb-3">
            <TextField
              error={isPasswordError}
              helperText={errorMessageList(passwordErrorMessage)}
              label="パスワード（6文字以上）"
              type="password"
              name="password"
              className={classes.formFiled}
              onChange={e => setPassword(e.target.value)}
              />
          </div>
          <div className="form-group mb-3">
            <TextField
              error={isPasswordError}
              label="パスワード（確認）"
              type="password"
              name="password_confirmation"
              className={classes.formFiled}
              onChange={e => setPasswordConfirmation(e.target.value)}
              />
          </div>
          <DialogActions>
            <Button onClick={handleClose}>
              キャンセル
            </Button>
            <Button
              variant="contained"
              type="submit"
              color="primary"
              disabled={isDisable}
            >
              登録
              </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  )
}

export default Signup