"use client";
import { GetUserAPI } from "@/services/GetUser.api";
import Sidebar from "@/templates/Sidebar";
import { Box, Skeleton, Table, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiUser } from "react-icons/bi";
import { FcTodoList } from "react-icons/fc";
import { LuLogOut } from "react-icons/lu";
import { logout } from "src/functions/logout";

const UsersPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isPending } = useQuery({
    queryKey: ["users"],
    queryFn: () => GetUserAPI(),
  });

  useEffect(() => {
    const hasUser = document.cookie.includes("user=");
    if (!hasUser) router.push("/task1/login");
  }, []);

  return (
    <div className="lg:flex  gap-x-10 ">
      <Sidebar />
      <Box overflowX="auto" width={"full"} mt="4">
        <Table.Root size="sm" variant="outline" minW="300px">
          <Table.Header>
            <Table.Row roundedTop={"md"}>
              <Table.ColumnHeader>نام</Table.ColumnHeader>
              <Table.ColumnHeader whiteSpace="nowrap">
                نام خانوادگی
              </Table.ColumnHeader>
              <Table.ColumnHeader minW="100px" whiteSpace="nowrap">
                ایمیل
              </Table.ColumnHeader>
              <Table.ColumnHeader display={{ md: "table-cell", base: "none" }}>
                تلفن
              </Table.ColumnHeader>
              <Table.ColumnHeader display={{ xl: "table-cell", base: "none" }}>
                تاریخ تولد
              </Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {isPending ? (
              <Table.Row>
                <Table.Cell>
                  <Skeleton height="20px" />
                </Table.Cell>

                <Table.Cell>
                  <Skeleton height="20px" />
                </Table.Cell>

                <Table.Cell>
                  <Skeleton height="20px" />
                </Table.Cell>

                <Table.Cell display={{ md: "table-cell", base: "none" }}>
                  <Skeleton height="20px" />
                </Table.Cell>

                <Table.Cell display={{ xl: "table-cell", base: "none" }}>
                  <Skeleton height="20px" />
                </Table.Cell>
              </Table.Row>
            ) : (
              <Table.Row bg={{ base: "gray.50", _dark: "gray.600" }}>
                <Table.Cell>{data?.firstName}</Table.Cell>
                <Table.Cell>{data?.lastName}</Table.Cell>

                <Table.Cell
                  minW="100px"
                  maxW="150px"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  whiteSpace="nowrap"
                >
                  {data?.email}
                </Table.Cell>

                <Table.Cell display={{ md: "table-cell", base: "none" }}>
                  {data?.phone}
                </Table.Cell>

                <Table.Cell display={{ xl: "table-cell", base: "none" }}>
                  {data?.birthDate}
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
};

export default UsersPage;
