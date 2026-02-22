"use client";

import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  Spinner,
  Field,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import logo from "@/images/Logo-bahmansabz.png";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { LoginUserAPI } from "@/services/LoginUser.api";
import { useRouter } from "next/navigation";
import { handleChange } from "@/functions";

type LoginType = {
  username: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [role, setRole] = useState<LoginType>({
    username: "",
    password: "",
  });
  const [eye, setEye] = useState(true);
  const [error, setError] = useState("");

  const { isError, isPending, isSuccess, mutate, data } = useMutation({
    mutationFn: () => LoginUserAPI(role),
  });

  useEffect(() => {
    isSuccess && router.push("/task1");
  }, [isSuccess]);

  useEffect(() => {
    const hasUser = document.cookie.includes("user=");
    if (hasUser) router.push("/task1");
  }, []);

  return (
    <Box minH="full" w="full">
      <Box maxW="2xl" mx="auto" pt="40">
        <Image
          alt="logo"
          src={logo}
          width={160}
          height={160}
          className="!mx-auto block "
        />

        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate();
          }}
        >
          <VStack gap="6" px="5">
            <Field.Root>
              <Field.Label mb="2">نام کاربری</Field.Label>
              <Input
                name="username"
                value={role.username}
                onChange={(e) => handleChange(e, setRole)}
                outline="none"
                h="12"
                rounded="lg"
              />
            </Field.Root>

            <Field.Root>
              <Field.Label mb="2">رمز عبور</Field.Label>

              <Box
                display="flex"
                position="relative"
                alignItems="center"
                width="full"
              >
                <Input
                  name="password"
                  type={eye ? "password" : "text"}
                  value={role.password}
                  onChange={(e) => handleChange(e, setRole)}
                  width="full"
                  outline="none"
                  h="12"
                  rounded="lg"
                />

                <div
                  className="absolute left-4"
                  onClick={() => setEye((prev) => !prev)}
                >
                  {eye ? <IoMdEyeOff /> : <IoMdEye />}
                </div>
              </Box>
            </Field.Root>

            <Button
              w="full"
              h="12"
              mt="4"
              rounded="lg"
              colorPalette="blue"
              disabled={!role.username || !role.password || isPending}
              type="submit"
            >
              {isPending ? <Spinner size="sm" /> : "ورود"}
            </Button>

            {isError && (
              <Text color="red.500" fontSize="sm" alignSelf="start">
                رمز عبور یا نام کاربری اشتباه است
              </Text>
            )}
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
