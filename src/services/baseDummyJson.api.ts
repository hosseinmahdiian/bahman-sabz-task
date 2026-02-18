import axios from "axios";

export const instanceDummyJson = axios.create({
  baseURL: "https://dummyjson.com",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
