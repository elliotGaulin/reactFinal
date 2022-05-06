// Api.js
import axios from "axios";

export default axios.create({
    baseURL: "https://calm-fjord-35373.herokuapp.com/",
    responseType: "json",
})
