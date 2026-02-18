import { instanceDummyJson } from "./baseDummyJson.api";

export const GetSingleProductAPI = async (id: { id: number }) => {
  try {
    const response = await instanceDummyJson.get(`/products/${id}`);
    const Product = response.data;
    return Product;
  } catch (error) {
    console.error("دریافت محصول ناموفق", error);
    throw error;
  }
};
