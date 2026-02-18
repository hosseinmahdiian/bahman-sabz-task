import ThemeToggle from "@/templates/themeToggle";
import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  HStack,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

const tasks = [
  { href: "/task1", label: "task1" },
  { href: "/task2", label: "task2" },
  { href: "/task3", label: "task3" },
];

const MainPage = () => {
  return (
    <Box>
      <Text textAlign="center" mt="5" fontSize="xl">
        تسک تستی برای موسسه فرهنگی بهمن سبز
      </Text>

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        mx="auto"
        gap="2"
        border="1px"
        p="4"
        borderRadius="xl"
      >
        {tasks.map((task) => (
          <Link
            key={task.href}
            href={task.href}
            className="!border border-theme !px-4 !py-2 rounded-xl bg-gray-400  text-theme "
          >
            {task.label}
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default MainPage;
