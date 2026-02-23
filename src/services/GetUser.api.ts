"use server";
import { instanceDummyJson } from "./baseDummyJson.api";
import { decrypt, encrypt } from "src/cryptoJs";
import { useGetAccessToken } from "@/hooks/useGetAccessToken";
import { cookies } from "next/headers";
import { maxAgeAccessToken } from "@/constants";

export const GetUserAPI = async () => {
  try {
    const accessToken = await useGetAccessToken();

    if (!accessToken) throw new Error("کوکی یافت نشد");

    instanceDummyJson.defaults.headers.common["Authorization"] =
      `Bearer ${accessToken}`;

    const response = await instanceDummyJson.get("/auth/me");

    if (response.data) {
      const user = encrypt(response.data);

      const cookieStore = await cookies();
      cookieStore.set("user", user, {
        maxAge: maxAgeAccessToken,
        httpOnly: true,
        // secure: true,
        path: "/",
      });

      return response.data;
    }
  } catch (error) {
    console.error("دریافت اطلاعات ناموفق", error);
    throw error;
  }
};
