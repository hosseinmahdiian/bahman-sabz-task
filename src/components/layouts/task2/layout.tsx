import React from "react";
import Footer from "./footer";
import Header from "./header";
import { childrenType } from "@/types";

const LayoutTask2 = ({ children }: childrenType) => {
  return (
      <div className="2xl:container mx-auto w-full h-full">
        <Header />
        <div className="min-h-[calc(100%-80px)] max-h-full h-full pt-20"> {children}</div>
        {/* <Footer /> */}
      </div>
  );
};

export default LayoutTask2;
