"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "@/images/Logo-bahmansabz.png";
import { Box, Container, Text } from "@chakra-ui/react";
import { LuLogOut } from "react-icons/lu";
import ThemeToggle from "@/templates/themeToggleChakar";
import { logout } from "src/functions/logout";
import { usePathname, useRouter } from "next/navigation";
import { BiLogIn, BiUser } from "react-icons/bi";
import { userInfo } from "src/functions/userInfo";

const Header = () => {
  const router = useRouter();
  const [hasUser, setHasUser] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const cookie = document.cookie;
    console.log(cookie.includes("user="));
    console.log(pathname);

    setHasUser(cookie.includes("user="));
  }, [pathname]);

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
        <Box display="flex" alignItems="center" gap="5">
          <Image alt="logo" src={logo} width={60} height={60} />
          <Text>موسسه بهمن سبز</Text>
        </Box>

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
