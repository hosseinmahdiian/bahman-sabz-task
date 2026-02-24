"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/images/Logo-bahmansabz.png";
import { Box, Container, Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import ThemeToggle from "@/templates/themeToggleChakar";
import { usePathname, useRouter } from "next/navigation";
import { BiLogIn, BiUser } from "react-icons/bi";
import { RefreshTokenAPI } from "@/services/RefreshToken.api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useGetAccessToken } from "@/hooks/useGetAccessToken";
import { useGetRefreshToken } from "@/hooks/useGetRefreshToken";

const Header = () => {
  const router = useRouter();
  const [hasUser, setHasUser] = useState(false);
  const pathname = usePathname();

  const {
    data: dataRefreshToken,
    isPending: isPendingRefreshToken,
    isSuccess: isSuccessRefreshToken,
    isError: isErrorRefreshToken,
    refetch: refetchRefreshToken,
  } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: () => RefreshTokenAPI(),
    enabled: false,
  });

  const checkTokens = async () => {
    const accessToken = await useGetAccessToken();
    const refreshToken = await useGetRefreshToken();

    if (!accessToken) {
      if (!refreshToken) {
        // router.push("/task1/login");
        return;
      }
      await refetchRefreshToken();
      return;
    } else {
      setHasUser(!!accessToken);
      // router.push("/task1");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkTokens();
    }, 100);
    console.log(pathname);
  }, [pathname, dataRefreshToken]);

  return (
    <Box
      h="80px"
      bgColor={{ base: "white", _dark: "blue.950" }}
      borderBottomWidth="1px"
      position="fixed"
      top="0"
      left="0"
      right="0"
      w="100%"
      display="flex"
      alignItems="center"
      zIndex="30"
    >
      <Container
        maxW="8xl"
        px="2"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Link href={"/"}>
          <Box display="flex" alignItems="center" gap="5">
            <Image alt="logo" src={logo} width={60} height={60} />
            <Text>موسسه بهمن سبز</Text>
          </Box>
        </Link>

        <Box display="flex" alignItems="center" gap="2">
          {!hasUser ? (
            <Box
              className="scale-130 transition-transform duration-300 hover:scale-160 flex text-[#78b5d8] cursor-pointer"
              onClick={() => {
                router.push("/task1/login");
                setHasUser(false);
              }}
            >
              <Text>ورود کاربر</Text>
            </Box>
          ) : (
            <Box
              className="scale-130 transition-transform duration-300 hover:scale-160 flex text-[#78b5d8] cursor-pointer"
              onClick={() => {
                router.push("/task1/users");
              }}
            >
              <BiUser />
            </Box>
          )}

          <ThemeToggle />
        </Box>
      </Container>
    </Box>
  );
};

export default Header;
