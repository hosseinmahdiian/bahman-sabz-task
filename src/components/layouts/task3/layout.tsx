import React from "react";

import { childrenType } from "@/types";
import { ThemeProvider } from "next-themes";
import Header from "../header";
import Footer from "../footer";

const LayoutTask3 = ({ children }: childrenType) => {
  return (
    <ThemeProvider attribute="data-theme">
      <div className=" w-full h-full">
        <Header />
        <div className="h-[calc(100%-160px)] mt-20 2xl:container mx-auto"> {children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default LayoutTask3;
