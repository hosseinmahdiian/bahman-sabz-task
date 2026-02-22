import {
  Box,
  Skeleton,
  SkeletonText,
  HStack,
  VStack,
  Flex,
} from "@chakra-ui/react";

const PostsCardSkeleton = () => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={5}
      shadow="sm"
      bg="white"
      _dark={{ bg: "gray.700" }}
      w="full"
      maxW="400px"
    >
      <VStack align="start" w="full">
        <Skeleton height="20px" width="70%" />

        <SkeletonText noOfLines={2} width="100%" pt={10} />

        <HStack wrap="wrap" w="full">
          <Skeleton height="20px" width="60px" borderRadius="full" />
          <Skeleton height="20px" width="50px" borderRadius="full" />
          <Skeleton height="20px" width="80px" borderRadius="full" />
        </HStack>

        <Flex align="center" gap={6} mt={2}>
          <Skeleton height="20px" width="40px" />
          <Skeleton height="20px" width="40px" />
          <Skeleton height="20px" width="40px" />
        </Flex>
      </VStack>
    </Box>
  );
};

export default PostsCardSkeleton;
