import { instanceDummyJson } from "./baseDummyJson.api";

export const GetSearchProductsAPI = async (search: { search: string }) => {
  try {
    const response = await instanceDummyJson.get(
      `/products/search?q=${search}`,
    );
    const Products = response.data;
    return Products;
  } catch (error) {
    console.error("دریافت محصولات ناموفق", error);
    throw error;
  }
};
