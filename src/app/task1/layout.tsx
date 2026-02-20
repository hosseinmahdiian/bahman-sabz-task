"use client";

import { childrenType } from "@/types";
import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import LayoutTask1 from "src/components/layouts/task1/layoutTask1";

const layout = ({ children }: childrenType) => {
  return (
    <ChakraProvider value={defaultSystem}>
      <LayoutTask1>{children}</LayoutTask1>
    </ChakraProvider>
  );
};

export default layout;
