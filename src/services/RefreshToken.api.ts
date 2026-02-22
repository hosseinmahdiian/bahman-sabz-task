"use server";
import { cookies } from "next/headers";
import { instanceDummyJson } from "./baseDummyJson.api";
import { encrypt } from "src/cryptoJs";
import { useGetRefreshToken } from "@/hooks/useGetRefreshToken";
import { maxAgeAccessToken, maxAgeRefreshToken } from "@/constants";
import { GetUserAPI } from "./GetUser.api";

export const RefreshTokenAPI = async () => {
  try {
    const refreshToken = await useGetRefreshToken();

    if (!refreshToken) throw new Error("کوکی یافت نشد");

    const response = await instanceDummyJson.post("/auth/refresh", {
      refreshToken: refreshToken ?? "",
      expiresInMins: 30,
    });

    const userData = response.data;

    if (userData) {
      const accessToken = encrypt(userData.accessToken);
      const refreshToken = encrypt(userData.refreshToken);

      const cookieStore = await cookies();

      cookieStore.set("accessToken", accessToken, {
        maxAge: maxAgeAccessToken,
        httpOnly: true,
        // secure: true,
        path: "/",
      });

      cookieStore.set("refreshToken", refreshToken, {
        maxAge: maxAgeRefreshToken,
        httpOnly: true,
        // secure: true,
        path: "/",
      });
      await GetUserAPI();

      return userData;
    }
  } catch (error) {
    console.error("رفرش توکن ناموفق", error);
    throw error;
  }
};
