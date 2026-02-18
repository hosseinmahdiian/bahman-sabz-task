"use server";
import { cookies } from "next/headers";
import { instanceDummyJson } from "./baseDummyJson.api";
import { decrypt, encrypt } from "src/cryptoJs";

export const RefreshTokenAPI = async () => {
  try {
    const cookie = await cookies();
    const oldData = cookie.get("user");

    if (!oldData) throw new Error("کوکی یافت نشد");

    const user = decrypt(oldData?.value);

    const response = await instanceDummyJson.post("/auth/refresh", {
      refreshToken: user?.refreshToken ?? "",
      expiresInMins: 30,
    });

    const userData = response.data;

    if (userData) {
      const encrypted = encrypt(userData);

      const cookieStore = await cookies();
      cookieStore.set("user", encrypted, {
        maxAge: 30 * 60,
        httpOnly: true,
        secure: true,
        path: "/",
      });

      return userData;
    }
  } catch (error) {
    console.error("رفرش توکن ناموفق", error);
    throw error;
  }
};
