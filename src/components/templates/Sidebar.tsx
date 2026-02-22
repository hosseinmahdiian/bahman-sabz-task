import { Box, Text, VStack } from "@chakra-ui/react";
import { BiUser } from "react-icons/bi";
import { FcTodoList } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import { usePathname, useRouter } from "next/navigation";
import { useLogout } from "@/hooks/useLogout";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const logout = () => useLogout();

  const links = [
    { label: "اطلاعات حساب کاربری", icon: <BiUser />, path: "/task1/users" },
    { label: "todoها", icon: <FcTodoList />, path: "/task1/users/todos" },
    { label: "post ها", icon: <FcTodoList />, path: "/task1/users/posts" },
    {
      label: "خروج از حساب کاربری",
      icon: <LuLogOut />,
      path: "/task1",
      color: "red.500",
    },
  ];

  return (
    <Box
      w={{ base: "full", lg: "300px" }}
      mt={4}
      p={4}
      bg={{ base: "gray.100", _dark: "blue.900" }}
      borderRadius="lg"
      shadow="md"
      borderWidth="1px"
      h="fit-content"
    >
      <VStack align="stretch">
        {links.map((link) => (
          <Box
            key={link.path}
            display="flex"
            alignItems="center"
            gap={2}
            fontWeight="bold"
            cursor="pointer"
            color={
              link.color
                ? link?.color
                : pathname === link.path
                  ? "blue.500"
                  : { base: "gray.500", _dark: "gray.200" }
            }
            transition="all 0.2s"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "md",
            }}
            onClick={() => {
              link.label == "خروج از حساب کاربری" && logout();
              router.push(link.path);
            }}
          >
            {link.icon}
            <Text>{link.label}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
