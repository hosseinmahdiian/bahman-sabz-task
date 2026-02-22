import React from "react";
import Footer from "./footer";
import Header from "./header";
import { childrenType } from "@/types";
import { ThemeProvider } from "next-themes";

const LayoutTask2 = ({ children }: childrenType) => {
  return (
    <ThemeProvider attribute="data-theme">
      <div className="2xl:container mx-auto w-full h-full">
        <Header />
        <div className="h-[calc(100%-160px)] mt-20"> {children}</div>
        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default LayoutTask2;
