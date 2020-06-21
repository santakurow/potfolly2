import React, { useState } from 'react'
import { Typography, Button, TextField, Paper } from '@material-ui/core'
import { makeStyles } from "@material-ui/core/styles";
import CameraAltIcon from "@material-ui/icons/CameraAlt";

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
    cursor: "pointer"
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
  const [errors, setErrors] = useState(null);
  const [isTitleError, setIsTitleError] = useState(false);
  const [isDescError, setIsDescError] = useState(false);
  const [isUrlError, setIsUrlError] = useState(false);
  const [titleErrorMessage, setTitleErrorMessage] = useState("");
  const [descErrorMessage, setDescErrorMessage] = useState("");
  const [urlErrorMessage, setUrlErrorMessage] = useState("");


  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <div className={`container ${classes.root} text-center`}>
      <Typography variant="h4" className="text-center">ポートフォリオの公開</Typography>
      <form onSubmit={handleSubmit} noValidate autoComplete="off" className="my-5">
        <div className="form-group">
          <Paper variant="outlined" className={classes.preview} component="label" htmlFor="preview">
            <CameraAltIcon className={classes.cameraIcon} />
            <Typography variant="h5">作品の画像を選択してください。</Typography>
          </Paper>
          <input type="file" id="preview" style={{display: "none"}} />
        </div>
        <div className="form-group">
          <TextField
            id="title"
            className={`${classes.formFiled}`}
            label="(必須) 作品名"
            name="title"
            variant="outlined"
            error={isTitleError}
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
            error={isDescError}
            multiline
            rows={4}
            onChange={e => setDesc(e.target.value)}
          />
        </div>
        <Button variant="contained" type="submit" color="primary">公開</Button>
      </form>
    </div>
  )
}

export default Public