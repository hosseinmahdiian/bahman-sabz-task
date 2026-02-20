"use client";
import { GetTodosByUserAPI } from "@/services/GetTodosByUser.api";
import { GetUserAPI } from "@/services/GetUser.api";
import Sidebar from "@/templates/Sidebar";
import { Badge, Box, Skeleton, Table, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

const TodosPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["todosByUser"],
    queryFn: () => GetTodosByUserAPI(),
  });

  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const hasUser = document.cookie.includes("user=");
    if (!hasUser) router.push("/task1/login");
  }, []);

  useEffect(() => {
    setTodos(data?.todos);
  }, [isSuccess]);

  return (
    <div className="lg:flex items-start gap-x-10 ">
      <Sidebar />
      <Box overflowX="auto" width={"full"} mt={"4"}>
        <Table.Root size="sm" variant="outline" minW="300px">
          <Table.Header>
            <Table.Row roundedTop={"md"}>
              <Table.ColumnHeader>todo</Table.ColumnHeader>
              <Table.ColumnHeader whiteSpace="nowrap">
                completed
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
              </Table.Row>
            ) : (
              todos?.map((todo) => (
                <Table.Row
                  key={todo.id}
                  bg={{ base: "gray.50", _dark: "gray.600" }}
                >
                  <Table.Cell>{todo?.todo}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={todo?.completed ? "green" : "red"}
                      bg={todo?.completed ? "green.100" : "red.100"}
                      px={3}
                      py={1}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      width={"fit"}
                    >
                      {todo?.completed ? (
                        <AiOutlineCheck />
                      ) : (
                        <AiOutlineClose />
                      )}
                      {todo?.completed ? "انجام شده" : "نیاز به انجام"}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
};

export default TodosPage;
