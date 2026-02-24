import Image from "next/image";
import logo from "@/images/Logo-bahmansabz.png";
import { Box, Container, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Container
      maxW="8xl"
      borderTopWidth="1px"
      h="20"
      px="2"
      color="theme"
      display={"flex"}
      alignItems={"center"}
      justifyContent="space-between"
    >
      <Text> پروژه تست</Text>
      <Image alt="logo" src={logo} width={60} height={60} />
    </Container>
  );
}

export default Footer;
