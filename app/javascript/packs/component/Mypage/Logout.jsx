import React from 'react'
import { Typography, Button } from '@material-ui/core'
import axios from "axios"


const Logout = (props) => {

  const [isDisable, setIsDisable] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
  
    const token = document.querySelector("meta[name='csrf-token']").getAttribute("content"); 
    const config = {
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
      }
    }
    axios.delete(`/sessions/${props.user.id}`, config)
      .then(res => {
        if (res.statusText === "OK") {
          setIsDisable(true);
          location.href = "/";
        }
    })
  }
  return (
    <div className="container">
      <Typography variant="h5" className="mt-3">
        <form onSubmit={handleSubmit} className="py-3">
          <div className="row">
            <div className="col-md-12 col-lg-10 offset-lg-1">
              <Button variant="contained"
                type="submit"
                style={{
                  backgroundColor: "#f50057",
                  color: "white",
                  display: "block",
                  width: "100%"
                }}
                disabled={isDisable}
              >
                ログアウト
              </Button>
            </div>
          </div>
        </form>
      </Typography>
    </div>
  )
}

export default Logout