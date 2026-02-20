import React from "react";
import Footer from "./footer";
import Header from "./header";
import { childrenType } from "@/types";
import { Box, Container } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

const LayoutTask1 = ({ children }: childrenType) => {
  return (
    <ThemeProvider attribute="class" >
      <Box bgColor={{ base: "white", _dark: "blue.950" }}>
        <Container>
          <Box w="100%" height="100%" pt="20">
            <Header />
            <Box minH="calc(100vh - 160px)" h="full">
              {children}
            </Box>
            <Footer />
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default LayoutTask1;
