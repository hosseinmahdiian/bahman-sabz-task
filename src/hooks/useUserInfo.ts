"use server";

import { cookies } from "next/headers";
import { decrypt } from "src/cryptoJs";

export const useUserInfo = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("user");
  if (!raw) return null;

  return await decrypt(raw.value);
};
