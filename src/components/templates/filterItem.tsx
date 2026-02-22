"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const FilterItem = ({ item }: { item: any }) => {
  const pathname = usePathname();

  return (
    <>
      <div
        className={`flex  items-center w-full h-14  bg-theme  md:text-lg font-bold gap-2 hover:bg-gray-50 hover:dark:!bg-gray-700 px-5  ${
          pathname === item?.link ? "text-blue-500  " : ""
        }`}
      >
        <span className="text-2xl text-[#78b5d8] ">{item?.icon}</span>
        <p
          className={`font-bold text-nowrap text-theme  ${
            pathname === item?.link &&
            "text-[#2879c6] dark:text-[#93cbff]  hover:text-[#2A53C0]"
          }`}
        >
          {item?.title}
        </p>
      </div>
      <div className=" w-[calc(100%-20px)] border-b border-theme  mx-auto  " />
    </>
  );
};

export default FilterItem;
