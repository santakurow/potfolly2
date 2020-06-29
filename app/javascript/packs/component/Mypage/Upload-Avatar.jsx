import React, { useEffect } from 'react'
import { Typography, Paper, Button } from '@material-ui/core';
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from 'react';
import axios from "axios";

const useStyles = makeStyles(() => ({
  cameraIcon: {
    fontSize: "10rem"
  }
}))

const UploadAvatar = (props) => {

  const classes = useStyles();
  const [isSelected, setIsSelect] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [getAttachedAvatar, setAttachedAvatar] = useState(props.avatar);

  const [isDisable, setIsDisable] = useState(false);

  const selectImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      setIsSelect(true);
      setAvatar(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        const output = document.getElementById("output");
        output.src = dataURL;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const url = `/users/${props.user.id}`;
    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const config = {
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    }
    const data = new FormData();
    data.append("user[avatar]", avatar, avatar.name);
    axios.patch(url, data, config)
      .then(response => {
        if (response.statusText === "OK") {
          setIsDisable(true);
          location.href = "/mypage/upload-avatar"
        }
      })
      .catch(error => console.log(error));
  }

  return (
    <div className="container">
      <Typography variant="h5" className="mt-3">アバターの設定</Typography>
      <form onSubmit={handleSubmit} className="my-3">
        <div className="row">
          <div className="col-md-12 col-lg-8 offset-lg-2">
            {(isSelected || getAttachedAvatar) ?
              <div>
                <Paper
                  variant="outlined"
                  style={{ width: "100%", margin: "10px 0", padding: "0 20%" }}
                >
                  {getAttachedAvatar ?
                    <img src={getAttachedAvatar} id="output"
                      style={{
                        width: "100%"
                      }} />
                    :
                    <img src="" id="output"
                      style={{
                        width: "100%"
                      }} />
                  }
                </Paper>
                <div className="row m-0">
                  <Button variant="contained" component="label" htmlFor="preview" className="col-lg-6 offset-lg-3" style={{margin: "10px auto"}}>変更</Button>
                </div>
                <div className="row m-0">
                  <Button variant="contained" color="primary" type="submit" className="col-lg-4 offset-lg-4" style={{ margin: "10px auto" }}
                  disabled={isDisable}>更新</Button>
                </div>
              </div>
              :
              <Paper
                variant="outlined"
                component="label"
                htmlFor="preview"
                style={{
                  cursor: "pointer", width: "100%",
                  textAlign: "center", margin: "10px 0",
                  // height: "235px"
                }}
              >
                <CameraAltIcon className={classes.cameraIcon} />
                <Typography variant="h5" className="mb-2">プロフィール画像を選択してください。</Typography>
              </Paper>
            }
            <input type="file" id="preview"
              style={{ display: "none" }}
              onChange={selectImage}
              accept="image/*"
            />
          </div>
        </div>
      </form>
    </div>
    
  )
}

export default UploadAvatar