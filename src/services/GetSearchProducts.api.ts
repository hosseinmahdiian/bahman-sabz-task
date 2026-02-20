import { instanceDummyJson } from "./baseDummyJson.api";

export const GetSearchProductsAPI = async ({
  search,
  skip,
}: {
  search: string;
  skip: number;
}) => {
  const params = new URLSearchParams({
    q: search,
    limit: "16",
    skip: ((skip - 1) * 16).toString(),
  });
  try {
    const response = await instanceDummyJson.get(
      `/products/search?${params.toString()}`,
    );
    const Products = response.data;
    return Products;
  } catch (error) {
    console.error("دریافت محصولات ناموفق", error);
    throw error;
  }
};
