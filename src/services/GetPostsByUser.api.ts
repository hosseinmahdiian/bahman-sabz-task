import { instanceDummyJson } from "./baseDummyJson.api";
import { useUserInfo } from "@/hooks/useUserInfo";

export const GetPostsByUserAPI = async () => {
  const cookieStore = await useUserInfo();
  try {
    const response = await instanceDummyJson.get(
      `users/${cookieStore?.id}/posts`,
    );
    return response.data;
  } catch (error) {
    console.error("دریافت Todo ناموفق", error);
    throw error;
  }
};
