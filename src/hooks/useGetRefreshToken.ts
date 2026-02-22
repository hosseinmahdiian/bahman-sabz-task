"use server";

import { cookies } from "next/headers";
import { decrypt } from "src/cryptoJs";

export const useGetRefreshToken = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("refreshToken");
  if (!raw) return null;
  return await decrypt(raw.value);
};
