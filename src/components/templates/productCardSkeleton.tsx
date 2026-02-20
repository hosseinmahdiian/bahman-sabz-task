import { Box, VStack, HStack, Skeleton, Text } from "@chakra-ui/react";

const ProductCardSkeleton = () => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      p={4}
      shadow="md"
      bg="white"
      _dark={{ bg: "blue.900" }}
      maxW="300px"
      transition="all 0.2s"
      _hover={{ shadow: "lg", transform: "scale(1.03)" }}
      w={{ base: "full", md: "300px" }}
      h={{ base: "300px", md: "300px" }}
      className="aspect-square"
    >
      <VStack align="start">
        <Skeleton height="120px" width="140px" mx="auto" borderRadius="md" />

        <VStack align="start" w="full" mt="7">
          <Skeleton height="20px" width="80%" />
          <Skeleton height="16px" width="60%" />
        </VStack>

        <Skeleton height="20px" width="40px" />

        <HStack wrap="wrap">
          {Array.from({ length: 3 }).map((_, idx) => (
            <Skeleton
              key={idx}
              height="20px"
              width="50px"
              borderRadius="full"
            />
          ))}
        </HStack>
      </VStack>
    </Box>
  );
};

export default ProductCardSkeleton;
