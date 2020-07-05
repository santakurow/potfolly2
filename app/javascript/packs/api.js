import axios from "axios"

const token = document.querySelector("meta[name='csrf-token']").getAttribute("content");

export default axios.create({
  headers: {
    "X-CSRF-Token": token,
    "Content-Type": "application/json"
  }
})