import axios from "axios";

export const instanceRawg = axios.create({
  baseURL: "https://api.rawg.io/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
