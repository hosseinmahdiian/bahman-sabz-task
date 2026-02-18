"use client";

import { childrenType } from "@/types";
import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: childrenType) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {/* <ChakraProvider>{children}</ChakraProvider> */}
    </ThemeProvider>
  );
};

export default Providers;
