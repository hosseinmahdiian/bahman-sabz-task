"use server";
import { cookies } from "next/headers";
import { instanceDummyJson } from "./baseDummyJson.api";
import { encrypt } from "src/cryptoJs";

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

    if (userData) {
      const encrypted = encrypt(userData);

      const cookieStore = await cookies();
      cookieStore.set("user", encrypted, {
        maxAge: 30 * 60,
        httpOnly: false,
        secure: false,
        path: "/",
      });

      return userData;
    }
  } catch (error) {
    console.error("لاگین ناموفق", error);
    throw error;
  }
};
