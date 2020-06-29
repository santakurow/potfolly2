import React, { useState } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import axios from "axios";

const EditMailPass = (props) => {
  const [password, setPassword] = useState(props.user.password);
  const [reset_password, setResetPassword] = useState("");
  const [reset_password_confirmation, setResetPasswordConfirmation] = useState("");
  const [isPasswordError, setIsPasswordError] = useState(false);
  const [isResetPasswordError, setIsResetPasswordError] = useState(false);
  const [isResetPasswordConfirmationError, setIsResetPasswordConfirmationError] = useState(false);

  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [resetPasswordErrorMessage, setResetPasswordErrorMessage] = useState("");
  const [resetPasswordConfirmationErrorMessage, setResetPasswordConfirmationErrorMessage] = useState("");

  const [isDisable, setIsDisable] = useState(false);

  const initialUpperCase = (err_msg) => {
    return err_msg.charAt(0).toUpperCase() + err_msg.slice(1)
  }

  const resetErrors = (attributes) => {
    const attrs = attributes;
    for (let i = 0; i < attrs.length; i++) {
      let errors = attrs[i];
      if (errors.match(/_/)) {
        const err = errors.split("_").map(error => {
          return initialUpperCase(error)
        });
        const str = err.toString().replace(/,/g, "");
        eval(`setIs${str}Error(false)`);
        eval(`set${str}ErrorMessage("")`);
      }
      else {
        eval(`setIs${initialUpperCase(errors)}Error(false)`);
        eval(`set${initialUpperCase(errors)}ErrorMessage("")`);
      }
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    setIsDisable(true);

    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      user: {
        password: password,
        reset_password: reset_password,
        reset_password_confirmation: reset_password_confirmation
      }
    }

    const config = {
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    }

    axios.post(`/resets/${props.user.id}`, data, config)
      .then(res => {
        if (res.statusText === "OK") {
          if (res.data.error) {
            setIsDisable(false);
            const errors = res.data;
            resetErrors(["password", "reset_password", "reset_password_confirmation"]);
            Object.keys(errors).map(error => {
              switch (error) {
                case "password":
                  setIsPasswordError(true);
                  setPasswordErrorMessage(errors["password"]);
                  break;
                case "reset_password":
                  setIsResetPasswordError(true);
                  setResetPasswordErrorMessage(errors["reset_password"]);
                  break;
                case "reset_password_confirmation":
                  setIsResetPasswordConfirmationError(true);
                  setResetPasswordConfirmationErrorMessage(errors["reset_password_confirmation"]);
                  break;
              }
            })
          }
          else {
            
            location.href = "/mypage/edit-mail-pass"
          }
        }
        
      })
      .catch(error => console.log(error));
  }
  
  return (
    <div className="container">
      <Typography variant="h5" className="mt-3"></Typography>
      <form onSubmit={handleSubmit} className="py-3">
        <div className="row mt-3">
          <div className="col-md-12 col-lg-10 offset-lg-1"
            style={{padding: "0 20%"}}
          >
            <TextField
              label="現在のパスワード"
              type="password"
              name="password"
              variant="outlined"
              margin="normal"
              style={{ width: "100%" }}
              error={isPasswordError}
              helperText={passwordErrorMessage}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 col-lg-10 offset-lg-1"
            style={{padding: "0 20%"}}
          >
            <TextField
              label="新しいパスワード"
              type="password"
              name="reset_password"
              variant="outlined"
              margin="normal"
              style={{ width: "100%" }}
              error={isResetPasswordError}
              helperText={resetPasswordErrorMessage}
              onChange={e => setResetPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12 col-lg-10 offset-lg-1"
            style={{padding: "0 20%"}}
          >
            <TextField
              label="新しいパスワード（確認）"
              type="password"
              name="reset_password_confirmation"
              variant="outlined"
              margin="normal"
              style={{ width: "100%" }}
              error={isResetPasswordConfirmationError}
              helperText={resetPasswordConfirmationErrorMessage}
              onChange={e => setResetPasswordConfirmation(e.target.value)}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-12 col-lg-10 offset-lg-1"
            style={{ padding: "0 20%" }}
          >
            <Button variant="contained"
              type="submit"
              color="primary"
              disabled={isDisable}
            >
              変更
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditMailPass