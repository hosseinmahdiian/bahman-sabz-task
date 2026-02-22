"use server";

import { OrderingType } from "@/types";
import { instanceRawg } from "./baseRawg.api";

export const GetGamesAPI = async ({
  page = 1,
  page_size = 30,
  search,
  ordering
}: {
  page?: number;
  page_size?: 30 | 50 | 100;
  search?: string;
  ordering?: OrderingType;
}) => {
  const params = new URLSearchParams();
  const API_KEY = process.env.API_KEY;

  params.set("page", page.toString());
  params.set("page_size", page_size.toString());

  if (search) params.set("search", search);
  if (ordering) params.set("ordering", ordering);

  try {
    const response = await instanceRawg.get(
      `/games?${params.toString()}&key=${API_KEY}`,
    );
    const Products = response.data;
    console.log(Products);

    return Products;
  } catch (error) {
    console.error("دریافت بازی ها ناموفق", error);
    throw error;
  }
};
