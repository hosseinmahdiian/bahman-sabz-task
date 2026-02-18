import Image from "next/image";
import logo from "@/images/Logo-bahmansabz.png";
import { Text } from "@chakra-ui/react";

function Footer() {
  return (
    <footer className="h-20 px-10 !border-t !border-0 border-theme w-full flex justify-between items-center bg-theme  text-theme mx-auto">
      <Text> پروژه تست</Text>
      <Image alt="logo" src={logo} width={60} height={60} />
    </footer>
  );
}

export default Footer;
