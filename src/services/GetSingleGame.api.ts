import { instanceRawg } from "./baseRawg.api";

export const GetSingleGameAPI = async (id: string) => {
  const API_KEY = process.env.API_KEY;
  
  try {
    const response = await instanceRawg.get(`/games/${id}?key=${API_KEY}`);
    console.log(response?.data?.name,id);

    return response.data;
  } catch (error) {
    console.error("دریافت بازی ناموفق", error);
    throw error;
  }
};
