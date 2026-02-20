"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  const user = await cookies();
  user.set("user", "", {
    expires: new Date(0),
    path: "/",
  });
};
