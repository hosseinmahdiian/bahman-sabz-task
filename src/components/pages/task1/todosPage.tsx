"use client";
import React, { useEffect, useState } from "react";
import { GetTodosByUserAPI } from "@/services/GetTodosByUser.api";
import { RefreshTokenAPI } from "@/services/RefreshToken.api";
import Sidebar from "@/templates/Sidebar";
import { Badge, Box, Skeleton, Table, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { useGetAccessToken } from "@/hooks/useGetAccessToken";
import { useGetRefreshToken } from "@/hooks/useGetRefreshToken";
import { useUserInfo } from "@/hooks/useUserInfo";

type Todo = {
  id: number;
  todo: string;
  completed: boolean;
};

const TodosPage = () => {
  const router = useRouter();
  const [todos, setTodos] = useState<Todo[]>([]);

  const {
    data: dataRefreshToken,
    isPending: isPendingRefreshToken,
    isSuccess: isSuccessRefreshToken,
    refetch: refetchRefreshToken,
  } = useQuery({
    queryKey: ["refreshToken"],
    queryFn: () => RefreshTokenAPI(),
    enabled: false,
  });

  const { data, isPending, isSuccess, isError, refetch } = useQuery({
    queryKey: ["todosByUser"],
    queryFn: () => GetTodosByUserAPI(),
    enabled: false,
  });

  useEffect(() => {
    if (isError) throw new Error("متن خطا");
  }, [isError]);

  const checkTokens = async () => {
    const user = await useUserInfo();
    const accessToken = await useGetAccessToken();
    const refreshToken = await useGetRefreshToken();

    if (!accessToken) {
      if (!refreshToken) {
        router.push("/task1/login");
        return;
      }
      await refetchRefreshToken();
      return;
    }
    await refetch();
  };

  useEffect(() => {
    checkTokens();
  }, []);

  useEffect(() => {
    isSuccessRefreshToken && refetch();
  }, [isSuccessRefreshToken]);

  useEffect(() => {
    setTodos(data?.todos);
  }, [isSuccess]);

  return (
    <div className="lg:flex items-start gap-x-10 ">
      <Sidebar />
      <Box overflowX="auto" width={"full"} mt={"4"}>
        <Table.Root size="sm" variant="outline" minW="300px">
          {todos?.length > 0 && (
            <Table.Header>
              <Table.Row roundedTop={"md"}>
                <Table.ColumnHeader>todo</Table.ColumnHeader>
                <Table.ColumnHeader whiteSpace="nowrap">
                  completed
                </Table.ColumnHeader>
              </Table.Row>
            </Table.Header>
          )}

          <Table.Body>
            {isPending ? (
              <>
                <Table.Row>
                  <Table.Cell>
                    <Skeleton height="20px" />
                  </Table.Cell>
                  <Table.Cell>
                    <Skeleton height="20px" />
                  </Table.Cell>
                </Table.Row>
              </>
            ) : todos?.length > 0 ? (
              todos.map((todo) => (
                <Table.Row
                  key={todo.id}
                  bg={{ base: "gray.50", _dark: "gray.600" }}
                >
                  <Table.Cell>{todo.todo}</Table.Cell>
                  <Table.Cell>
                    <Badge
                      color={todo.completed ? "green" : "red"}
                      bg={todo.completed ? "green.100" : "red.100"}
                      px={3}
                      py={1}
                      borderRadius="full"
                      display="flex"
                      alignItems="center"
                      gap={2}
                      width="fit"
                    >
                      {todo.completed ? <AiOutlineCheck /> : <AiOutlineClose />}
                      {todo.completed ? "انجام شده" : "نیاز به انجام"}
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Box mx="auto">
                <Text textAlign={"center"}>موردی یافت نشد</Text>
              </Box>
            )}
          </Table.Body>
        </Table.Root>
      </Box>
    </div>
  );
};

export default TodosPage;
