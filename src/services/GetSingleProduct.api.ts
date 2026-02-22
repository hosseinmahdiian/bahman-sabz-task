import { instanceDummyJson } from "./baseDummyJson.api";

export const GetSingleProductAPI = async (id: string) => {
  try {
    const response = await instanceDummyJson.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("دریافت محصول ناموفق", error);
    throw error;
  }
};
