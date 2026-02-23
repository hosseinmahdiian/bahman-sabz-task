import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "@/images/Logo-bahmansabz.png";

function Footer() {
  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white h-20 absolute bottom-0 w-full ">
      <div className="flex items-center mx-auto w-full  2xl:px-10 px-5  h-full justify-center  2xl:container ">
        <Link href={"/"} className="flex items-center gap3  ">
          <Image alt="logo" src={logo} width={60} height={60} />
          <p>موسسه بهمن سبز</p>
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
