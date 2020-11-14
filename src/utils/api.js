import axios from "axios";

export default axios.create({
  baseURL: "https://boiling-caverns-10919.herokuapp.com/api/",
  responseType: "json"
});
