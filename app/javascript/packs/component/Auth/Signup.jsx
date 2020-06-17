import React from 'react'
import { Formik, Form, Field } from 'formik';
import { Button, LinearProgress, Typography } from '@material-ui/core';
import { Link } from "react-router-dom"
import { TextField } from 'formik-material-ui';
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
}))

const Signup = () => {
  const classes = useStyles();
  return (
    <div>
      <div className={`container text-center ${classes.root}`}>
        <Typography variant="h4">ユーザー登録</Typography>
        <Formik
          initialValues={{
            email: '',
            password: '',
            nickname: '',
            password_confirmation: ''
          }}
          onSubmit={(values, { setSubmitting }) => {
            // const url = "/users";
            // const data = JSON.stringify(values, null, 2);
            // const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");
            // axios.post(url, data, {
            //   headers: {
            //     "X-CSRF-Token": token,
            //     "Content-Type": "application/json"
            //   }
            // })
            //   .then(response => {
            //     if (response.statusText === "OK") {
            //       console.log(response.data);
            //     }
            //   })
            //   .catch(error => console.log(error));
            console.log(values);
            setSubmitting(false);
          }}
        >
          {({ submitForm, isSubmitting }) => (
            <Form autoComplete="off" method="POST" className="my-2">
              <Field
                component={TextField}
                name="nickname"
                type="text"
                label="ニックネーム"
                className={classes.formFiled}
              />
              <br />
              <Field
                component={TextField}
                name="email"
                type="email"
                label="メールアドレス"
                className={classes.formFiled}
              />
              <br />
              <Field
                component={TextField}
                name="password"
                type="password"
                label="パスワード（６文字以上）"
                className={classes.formFiled}
              />
              <br />
              <Field
                component={TextField}
                name="password_confirmation"
                type="password"
                label="パスワード（確認）"
                className={classes.formFiled}
              />
              {/* {isSubmitting && <LinearProgress />} */}
              <br />
              <Button
                variant="contained"
                color="primary"
                disabled={isSubmitting}
                onClick={submitForm}
                className="mt-3"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <Link to="/" className="mt-2">戻る</Link>
      </div> 
    </div>
  )
}

export default Signup