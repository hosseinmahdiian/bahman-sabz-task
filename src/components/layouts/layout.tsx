import React from "react";
import Footer from "./footer";
import Header from "./header";
import { childrenType } from "@/types";
import { Box, Container } from "@chakra-ui/react";

const Layout = ({ children }: childrenType) => {
  return (
    <Box bgColor={{ base: "white", _dark: "blue.950" }}>
      <Container xl={{ display: "block" }} display="none ">
        <Box w="100%" height="100%" pt="20">
          <Header />
          <Box minH="calc(100vh - 160px)">{children}</Box>
          <Footer />
        </Box>
      </Container>
    </Box>
  );
};

export default Layout;
