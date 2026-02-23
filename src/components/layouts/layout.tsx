import React from "react";
import Footer from "./footer";
import Header from "./header";
import { childrenType } from "@/types";
import { ThemeProvider } from "next-themes";

const LayoutMain = ({ children }: childrenType) => {
  return (
    <ThemeProvider attribute="data-theme">
      <div className=" w-full h-full absolute ">
        <Header />
        <div className="h-[calc(100%-160px)] mt-20 2xl:container mx-auto "> {children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default LayoutMain;
