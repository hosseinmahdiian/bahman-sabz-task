"use server";
import { instanceDummyJson } from "./baseDummyJson.api";
import { OrderFields, SortOrder } from "@/types";

export const GetAllProductsAPI = async ({
  skip = 1,
  limit = 16,
}: {
  skip?: number;
  limit?: number;
}) => {
  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: ((skip - 1) * limit).toString(),
  });

  try {
    const response = await instanceDummyJson.get(
      `/products?${params.toString()}`,
    );
    const Products = response.data;
    console.log(Products);

    return Products;
  } catch (error) {
    console.error("دریافت محصولات ناموفق", error);
    throw error;
  }
};
