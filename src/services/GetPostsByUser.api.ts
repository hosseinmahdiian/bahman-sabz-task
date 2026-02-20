import { instanceDummyJson } from "./baseDummyJson.api";
import { userInfo } from "src/functions/userInfo";

export const GetPostsByUserAPI = async () => {
  const cookieStore = await userInfo();
  try {
    const response = await instanceDummyJson.get(`users/${cookieStore?.id}/posts`);
    const Product = response.data;
    return Product;
  } catch (error) {
    console.error("دریافت Todo ناموفق", error);
    throw error;
  }
};
