"use client";

import { Box } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { FC, useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle: FC = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const currentTheme: "light" | "dark" =
    theme === "system"
      ? (systemTheme as "light" | "dark")
      : (theme as "light" | "dark");


  return (
    <Box
      as="button"
      onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
      className="group relative rounded-xl w-10 h-10 flex items-center justify-center "
    >
      <Box className=" scale-130 transition-transform duration-300 group-hover:scale-160 flex text-[#78b5d8] cursor-pointer ">
        {currentTheme === "dark" ? <MdLightMode /> : <MdDarkMode />}
      </Box>
    </Box>
  );
};

export default ThemeToggle;
