import { instanceDummyJson } from "./baseDummyJson.api";
import { userInfo } from "src/functions/userInfo";

export const GetTodosByUserAPI = async () => {
  const cookieStore = await userInfo();
  try {
    const response = await instanceDummyJson.get(`users/${cookieStore?.id}/todos`);
    const Product = response.data;
    return Product;
  } catch (error) {
    console.error("دریافت Todo ناموفق", error);
    throw error;
  }
};
