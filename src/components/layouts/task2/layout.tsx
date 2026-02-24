import React from "react";

import { childrenType } from "@/types";
import { ThemeProvider } from "next-themes";
import Header from "../header";
import Footer from "../footer";

const LayoutTask2 = ({ children }: childrenType) => {
  return (
    <ThemeProvider attribute="data-theme">
      <div className=" w-full h-full">
        <Header />
        <div className="min-h-[calc(100%-80px)] max-h-full h-full 2xl:container mx-auto pt-20">
          {children}
        </div>
        {/* <Footer /> */}
      </div>
    </ThemeProvider>
  );
};

export default LayoutTask2;
