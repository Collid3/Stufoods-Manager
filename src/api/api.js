import axios from "axios";

export const apiWithCred = (accessToken) =>
  axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

export default axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  withCredentials: true,
});
