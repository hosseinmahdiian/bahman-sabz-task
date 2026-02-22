"use client";
import { useGetAccessToken } from "@/hooks/useGetAccessToken";
import { useGetRefreshToken } from "@/hooks/useGetRefreshToken";
import { GetPostsByUserAPI } from "@/services/GetPostsByUser.api";
import { RefreshTokenAPI } from "@/services/RefreshToken.api";
import PostsCord from "@/templates/postsCord";
import PostsCardSkeleton from "@/templates/postsCordSkeleton";
import Sidebar from "@/templates/Sidebar";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  body: string;
  reactions: { like: number; dislike: number };
  tags: string[];
  views: number;
};

const PostsPage = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);

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

  const { data, isPending, isSuccess, refetch } = useQuery({
    queryKey: ["postsByUser"],
    queryFn: () => GetPostsByUserAPI(),
    enabled: false,
  });

  const checkTokens = async () => {
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
    setPosts(data?.posts);
  }, [isSuccess]);

  return (
    <div className="lg:flex items-start gap-x-10 ">
      <Sidebar />
      <SimpleGrid
        width="full"
        mt="4"
        columns={{ base: 1, md: 2, xl: 3 }}
        gap={3}
      >
        {!isPending ? (
          posts?.length > 0 ? (
            posts.map((item) => <PostsCord key={item.id} item={item} />)
          ) : (
            <Box mx="auto" gridColumn="1 / -1">
              <Text textAlign="center">موردی یافت نشد</Text>
            </Box>
          )
        ) : (
          Array.from({ length: 4 }).map((_, idx) => (
            <PostsCardSkeleton key={idx} />
          ))
        )}
      </SimpleGrid>
    </div>
  );
};

export default PostsPage;
