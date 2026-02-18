"use server";
import { cookies } from "next/headers";
import { instanceDummyJson } from "./baseDummyJson.api";
import { decrypt } from "src/cryptoJs";

export const GetUserAPI = async () => {
  try {
    const cookie = await cookies();
    const oldData = cookie.get("user");
    if (!oldData) throw new Error("کوکی یافت نشد");

    const user = decrypt(oldData?.value);

    instanceDummyJson.defaults.headers.common["Authorization"] =
      `Bearer ${user?.accessToken}`;

    const response = await instanceDummyJson.get("/auth/me");

    return response.data;
  } catch (error) {
    console.error("دریافت اطلاعات ناموفق", error);
    throw error;
  }
};
