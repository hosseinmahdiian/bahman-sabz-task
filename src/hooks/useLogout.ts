"use server";

import { cookies } from "next/headers";

export const useLogout = async () => {
  const user = await cookies();
  user.set("user", "", {
    expires: new Date(0),
    path: "/",
  });
  user.set("accessToken", "", {
    expires: new Date(0),
    path: "/",
  });
  user.set("refreshToken", "", {
    expires: new Date(0),
    path: "/",
  });
};
