"use server";

import { cookies } from "next/headers";
import { decrypt } from "src/cryptoJs";

export const useGetAccessToken = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("accessToken");
  if (!raw) return null;
  return await decrypt(raw.value);
};
