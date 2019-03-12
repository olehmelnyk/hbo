import axios from "axios";

// const API_HOST = "http://localhost:3001";
const API_VERSION = "v1";
const TOKEN = localStorage.getItem("jwtToken");

axios.defaults.headers.common["Authorization"] = TOKEN;
axios.defaults.headers["Content-Type"] = "application/json";

export const user = axios.create({
  baseURL: `/api/${API_VERSION}/user`
});

export const auth = axios.create({
  baseURL: `/api/${API_VERSION}/auth`
});

export const show = axios.create({
  baseURL: `/api/${API_VERSION}/show`
});

export const season = axios.create({
  baseURL: `/api/${API_VERSION}/season`
});

export const episode = axios.create({
  baseURL: `/api/${API_VERSION}/episode`
});
