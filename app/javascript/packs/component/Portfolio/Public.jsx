import React, { useState, useEffect } from 'react'
import { Typography, Button, TextField, Paper } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import CameraAltIcon from "@material-ui/icons/CameraAlt";
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    marginTop: "5rem"
  },
  formFiled: {
    width: "550px",
    marginBottom: "18px"
  },
  preview: {
    width: "550px",
    height: "200px",
    margin: "0 auto",
    marginBottom: "18px",
  },
  upImg: {
    height: "200px",
    margin: "0 auto",
    objectFit: "cover"
    
  },
  cameraIcon: {
    fontSize: "10rem"
  }
}));

const Public = () => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState(null);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isDescError, setIsDescError] = useState(false);
  const [isUrlError, setIsUrlError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [descErrorMessage, setDescErrorMessage] = useState("");
  const [urlErrorMessage, setUrlErrorMessage] = useState("");

  const [isSelect, setIsSelect] = useState(false);

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

    const data = new FormData();
    if (image) {
      data.append("portfolio[image]", image, image.name);
    }
    data.append("portfolio[title]", title);
    data.append("portfolio[url]", url);
    data.append("portfolio[desc]", desc);
    const Url = "/portfolios";

    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
    const config = {
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    }
    axios.post(Url, data, config)
      .then(response => {
        if (response.statusText === "OK") {
          return response.data
        }
      }).then(data => {
        if (data.error) {
          const errors = data;
          
          resetErrors(["title", "url", "desc"]);
          Object.keys(errors).map(error => {
            switch (error) {
              case "title":
                setIsTitleError(true);
                setTitleErrorMessage(errors["title"]);
                break;
              case "url":
                setIsUrlError(true);
                setUrlErrorMessage(errors["url"]);
                break;
              case "desc":
                setIsDescError(true);
                setDescErrorMessage(errors["desc"]);
                break;
            }
          })
        }
        else {
          setIsDisable(true);
          location.href = "/"
        }
      }).catch(error => console.log(error));
  }

  const handleSelectImage = (event) => {

    if (event.target.files && event.target.files[0]) {
      setIsSelect(true);
      setImage(event.target.files[0]);
      const reader = new FileReader();
      reader.onload = () => {
        const dataURL = reader.result;
        const output = document.getElementById("output");
        output.src = dataURL;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  return (
    <div className={`container ${classes.root} text-center`}>
      <Typography variant="h4" className="text-center">ポートフォリオの公開</Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="my-5">
        <div className="form-group">
          {isSelect ?
            <Paper variant="outlined" className={classes.preview}>
              <img src="" id="output" className={classes.upImg} />
            </Paper>
            :
            <Paper variant="outlined" className={classes.preview}
              component="label" htmlFor="preview" style={{cursor: "pointer"}}>
              <CameraAltIcon className={classes.cameraIcon} />
              <Typography variant="h5">作品の画像を選択してください。</Typography>
            </Paper>
          }
          <input type="file" id="preview" style={{display: "none"}} onChange={handleSelectImage} accept="image/*" />
        </div>
        <div className="form-group">
          <TextField
            id="title"
            className={`${classes.formFiled}`}
            label="(必須) 作品名"
            name="title"
            variant="outlined"
            error={isTitleError}
            helperText={titleErrorMessage}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            id="url"
            className={`${classes.formFiled}`}
            label="関連URL"
            name="url"
            type="url"
            variant="outlined"
            error={isUrlError}
            helperText={urlErrorMessage}
            onChange={e => setUrl(e.target.value)}
          />
        </div>
        <div className="form-group">
          <TextField
            id="desc"
            className={`${classes.formFiled}`}
            label="作品詳細"
            name="desc"
            variant="outlined"
            helperText={descErrorMessage}
            error={isDescError}
            multiline
            rows={4}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <Button variant="contained" type="submit" color="primary" disabled={isDisable}>公開</Button>
      </form>
    </div>
  )
}

export default Public