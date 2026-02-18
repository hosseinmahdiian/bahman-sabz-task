"use server";
import { cookies } from "next/headers";
import { instanceDummyJson } from "./baseDummyJson.api";
import { encrypt } from "src/cryptoJs";

export const GetAllProductsAPI = async ({
  skip = 1,
  limit = 10,
  order,
  sortBy,
}: {
  skip?: number;
  limit?: 10 | 20 | 30;
  order?: "title" | "" | "" | "" | "";
  sortBy?: "asc" | "" | "" | "";
}) => {
  try {
    const response = await instanceDummyJson.get(
      `/products?limit=${limit}&skip=${(skip - 1) * limit}${order && `&order=${order}`}${sortBy && `&sortBy=${sortBy}`}`,
    );
    const Products = response.data;
    return Products;
  } catch (error) {
    console.error("دریافت محصولات ناموفق", error);
    throw error;
  }
};
