import React, {useEffect, useState} from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import axios from "axios"

const Profile = (props) => {

  const [user, setUser] = useState(props.user);
  const [nicknameErrorMessage, setNicknameErrorMessage] = useState("");
  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [isNicknameError, setIsNicknameError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  
  const [isDisable, setIsDisable] = useState(false);

  const resetErrors = (attributes) => {
    const attrs = attributes;
    for (let i = 0; i < attrs.length; i++) {
      eval(`setIs${attrs[i].charAt(0).toUpperCase() + attrs[i].slice(1)}Error(false)`);
      eval(`set${attrs[i].charAt(0).toUpperCase() + attrs[i].slice(1)}ErrorMessage("")`);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsDisable(true);

    const url = `/users/${props.user.id}`;
    
    const data = {
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname,
        email: user.email,
        pr: user.pr,
      }
    }
    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const config = {
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    }
    axios.patch(url, data, config)
      .then(response => {
        if (response.statusText === "OK") {
          // console.log(response.data);
          if (response.data.error) {
            setIsDisable(false);
            const errors = response.data;
            resetErrors(["nickname", "email"]);
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
              }
            })
          }
          else {
            location.href = "/mypage/profile";
          }
        }
      })
      .catch(error => console.log(error));

  }

  return (
    <div className="container">
      <Typography variant="h5" className="mt-3">基本情報</Typography>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <TextField
              label="姓"
              type="text"
              name="firstname"
              defaultValue={user.firstname}
              variant="outlined"
              margin="normal"
              style={{ width: "100%" }}
              onChange={e => setUser({[e.target.name]: e.target.value})}
              />
          </div>
          <div className="col-md-12 col-lg-6">
            <TextField
              label="名"
              type="text"
              name="lastname"
              defaultValue={user.lastname}
              variant="outlined"
              margin="normal"
              style={{ width: "100%" }}
              onChange={e => setUser({[e.target.name]: e.target.value})}
              />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <TextField
              label="ニックネーム"
              type="text"
              name="nickname"
              defaultValue={user.nickname}
              variant="outlined"
              margin="normal"
              style={{ width: "100%" }}
              error={isNicknameError}
              helperText={nicknameErrorMessage}
              onChange={e => setUser({[e.target.name]: e.target.value})}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
          <TextField
              label="メールアドレス"
              type="email"
              name="email"
              defaultValue={user.email}
              variant="outlined"
              margin="normal"
              style={{ width: "100%" }}
              error={isEmailError}
              helperText={emailErrorMessage}
              onChange={e => setUser({ [e.target.name]: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <TextField
              label="自己紹介"
              multiline
              rows={5}
              name="pr"
              defaultValue={user.pr}
              variant="outlined"
              className="my-4"
              style={{ width: "100%" }}
              onChange={e => setUser({[e.target.name]: e.target.value})}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-2 mt-3">
            <Button variant="contained" type="submit" color="primary" style={{ width: "100%" }}
            disabled={isDisable}>更新</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile