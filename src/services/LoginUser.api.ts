"use server";
import { cookies } from "next/headers";
import { instanceDummyJson } from "./baseDummyJson.api";
import { encrypt } from "src/cryptoJs";
import { maxAgeAccessToken, maxAgeRefreshToken } from "@/constants";
import { GetUserAPI } from "./GetUser.api";

export const LoginUserAPI = async (data: {
  username: string;
  password: string;
}) => {
  const { username, password } = data;

  try {
    const response = await instanceDummyJson.post("/auth/login", {
      username,
      password,
      expiresInMins: 30,
    });
    const userData = response.data;
    console.log(userData);

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
    console.error("لاگین ناموفق", error);
    throw error;
  }
};
