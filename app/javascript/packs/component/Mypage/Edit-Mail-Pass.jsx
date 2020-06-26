import React, { useState } from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import { useEffect } from 'react';
import axios from "axios";

const EditMailPass = (props) => {

  const [email, setEmail] = useState(props.user.email);
  const [password, setPassword] = useState(props.user.password);
  const [reset_password, setResetPassword] = useState("");
  const [reset_confirmation, setResetPasswordConfirm] = useState("");

  useEffect(() => {

  })

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const data = {
      session: {
        email: email,
        password: password,
        reset: reset_password,
        reset_confirmation: reset_confirmation
      }
    }

    const config = {
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    }

    // axios.patch(`/sessions/${props.user.id}`, data, config)
    //   .then(res => {
    //     if (res.statusText === "OK") {
    //       console.log(res.data);
    //     }
        
    //   })
    //   .catch(error => console.log(error));
  }
  
  return (
    <div className="container">
      <Typography variant="h5" className="mt-3"></Typography>
      <form onSubmit={handleSubmit} className="py-3">
        <div className="row mt-3">
          <div className="col-md-12 col-lg-10 offset-lg-1"
            style={{padding: "0 20%"}} >
            <TextField
              label="メールアドレス"
              type="email"
              name="email"
              variant="outlined"
              margin="normal"
              style={{width: "100%"}}
              defaultValue={props.user.email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
        </div>
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
              style={{width: "100%"}}
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
              name="reset"
              variant="outlined"
              margin="normal"
              defaultValue=""
              style={{ width: "100%" }}
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
              name="reset_confirmation"
              variant="outlined"
              margin="normal"
              defaultValue=""
              style={{ width: "100%" }}
              onChange={e => setResetPasswordConfirm(e.target.value)}
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