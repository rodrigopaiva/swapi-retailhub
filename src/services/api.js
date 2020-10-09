import axios from "axios";

//base url
const api = axios.create({baseURL: "https://swapi.dev/api/"});

export default api;