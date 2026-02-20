"use client";
import { GetPostsByUserAPI } from "@/services/GetPostsByUser.api";
import PostsCord from "@/templates/postsCord";
import Sidebar from "@/templates/Sidebar";
import { Box, SimpleGrid } from "@chakra-ui/react";
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
  const { data, isPending, isSuccess } = useQuery({
    queryKey: ["postsByUser"],
    queryFn: () => GetPostsByUserAPI(),
  });

  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const hasUser = document.cookie.includes("user=");
    if (!hasUser) router.push("/task1/login");
  }, []);

  useEffect(() => {
    setPosts(data?.posts);
  }, [isSuccess]);

  return (
    <div className="lg:flex items-start gap-x-10 ">
      <Sidebar />
      <SimpleGrid
        width={"full"}
        mt={"4"}
        grid={{ base: "1", md: "2", xl: "3" }}
      >
        {isSuccess &&
          posts?.map((item) => <PostsCord key={item?.id} item={item} />)}
      </SimpleGrid>
    </div>
  );
};

export default PostsPage;
