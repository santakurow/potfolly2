import React, {useEffect, useState} from 'react'
import { Typography, TextField, Button } from '@material-ui/core'
import axios from "axios"

const Profile = (props) => {

  const [user, setUser] = useState(props.user);
  const [errors, setErrors] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    
    // console.log(props.user);
      
  }, []) 

  const handleSubmit = (event) => {
    event.preventDefault();

    const url = `/users/${props.user.id}`;
    
    const data = {
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        nickname: user.nickname,
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
          setIsError(false);
          if (response.data.error) {
            setIsError(true);
            setErrors(response.data);
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
              className="my-4"
              style={{ width: "100%" }}
              error={isError}
              helperText={errors.nickname}
              onChange={e => setUser({[e.target.name]: e.target.value})}
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
            <Button variant="contained" type="submit" color="primary" style={{width: "100%"}}>更新</Button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Profile