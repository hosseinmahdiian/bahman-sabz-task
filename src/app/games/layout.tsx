import { childrenType } from "@/types";
import { Metadata } from "next";
import LayoutTask2 from "src/components/layouts/task2/layout";

export const metadata: Metadata = {
  title: "تسک ۲",
  description: "تسک ۲",
};

const layout = ({ children }: childrenType) => {
  return <LayoutTask2>{children}</LayoutTask2>;
};

export default layout;
