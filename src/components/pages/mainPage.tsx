import ThemeToggle from "@/templates/themeToggleChakar";
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
import LayoutMain from "../layouts/layout";

const tasks = [
  { href: "/task1", label: "task1" },
  { href: "/games", label: "task2" },
  { href: "/task3", label: "task3" },
];

const MainPage = () => {
  return (
    <LayoutMain>
      <p className="text-center text-xl mt-4 text-theme ">
        تسک تستی برای موسسه فرهنگی بهمن سبز
      </p>

      <div className=" flex items-center justify-center mx-auto gap-2 border p4 rounded-xl">
        {tasks.map((task) => (
          <Link
            key={task.href}
            href={task.href}
            className="border border-theme px-4 py-2 rounded-xl bg-gray-400  text-theme "
          >
            {task.label}
          </Link>
        ))}
      </div>
    </LayoutMain>
  );
};

export default MainPage;
