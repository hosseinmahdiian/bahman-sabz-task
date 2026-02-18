import Image from "next/image";
import Logo from "@/images/logo.jpg";
import Link from "next/link";
import ThemeToggle from "@/templates/themeToggle";
import { Box, Container, Text } from "@chakra-ui/react";
import logo from "@/images/Logo-bahmansabz.png";

const Header = () => {
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
      bg="theme"
      color="theme"
      zIndex="30"
    >
      <Container
        maxW="8xl"
        px="2"
        display={"flex"}
        alignItems={"center"}
        justifyContent="space-between"
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          // justifyContent="space-between"
          gap={"5"}
        >
          <Image alt="logo" src={logo} width={60} height={60} />
          <Text>موسسه بهمن سبز</Text>
        </Box>

        <Box display={"flex"} alignItems={"center"}>
          <ThemeToggle />
          <ThemeToggle />
        </Box>
        
      </Container>
    </Box>
  );
};

export default Header;
