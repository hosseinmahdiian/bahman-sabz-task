import { Box, Text, Badge, HStack, VStack, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const ProductCard = ({ item }: { item: any }) => {
  const { images, price, tags, title, category, id } = item || {};
  return (
    <Link href={`/task1/product/${id}`} className="cursor-pointer">
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
          {images?.[0] && (
            <Image
              src={images[0]}
              alt={title}
              height={140}
              width={140}
              className="!mx-auto "
            />
          )}

          <VStack align="start">
            <Text fontSize="lg" fontWeight="bold" lineClamp={1}>
              {title}
            </Text>
            <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.300" }}>
              دسته‌بندی: {category}
            </Text>
          </VStack>

          <Text fontSize="md" fontWeight="bold" color="blue.500">
            ${price}
          </Text>

          <HStack wrap="wrap">
            {tags?.map((tag: string, idx: number) => (
              <Badge
                key={idx}
                colorScheme="teal"
                px={2}
                py={1}
                borderRadius="full"
              >
                {tag}
              </Badge>
            ))}
          </HStack>
        </VStack>
      </Box>
    </Link>
  );
};

export default ProductCard;
