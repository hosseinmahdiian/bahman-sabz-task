"use server";

import { cookies } from "next/headers";
import { decrypt } from "src/cryptoJs";

export const userInfo = async () => {
  const cookieStore = await cookies();
  const raw = cookieStore.get("user");
  if (!raw) return null;
  const user = await decrypt(raw.value);
  return user;
};
