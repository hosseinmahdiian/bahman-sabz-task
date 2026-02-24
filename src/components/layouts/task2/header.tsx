import Image from "next/image";
import logo from "@/images/Logo-bahmansabz.png";
import Link from "next/link";
import { useContext } from "react";
import ThemeToggle from "@/templates/themeToggle";

const Header = () => {
  return (
    <header className="h-20 fixed inset-x-0 w-full top-0 flex items-center bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white !z-50 text-theme ">
      <div className="flex items-center mx-auto w-full  2xl:px-10 px-5  justify-between 2xl:container ">
        <Link href={"/"} className="flex items-center gap3 ">
          <Image alt="logo" src={logo} width={60} height={60} />
          <p>موسسه بهمن سبز</p>
        </Link>
        <div className=" ">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
