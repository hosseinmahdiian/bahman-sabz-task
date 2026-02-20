import { Box, Text, Badge, HStack, VStack, Icon, Flex } from "@chakra-ui/react";
import { AiOutlineDislike, AiOutlineEye, AiOutlineLike } from "react-icons/ai";

const PostsCard = (item: any) => {
  const { title, body, reactions, tags, views } = item?.item;
  console.log(reactions);

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
      transition="all 0.2s"
      _hover={{ shadow: "lg", transform: "scale(1.02)" }}
    >
      <VStack align="start">
        <Text fontSize="xl" fontWeight="bold">
          {title}
        </Text>

        <Text
          fontSize="md"
          color="gray.600"
          _dark={{ color: "gray.300" }}
          lineClamp={2}
        >
          {body}
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

        <Flex align="center" gap={4} mt={2}>
          <HStack>
            <AiOutlineEye />
            <Text>{views}</Text>
          </HStack>
          <HStack>
            <AiOutlineLike />
            <Text>{reactions?.like}</Text>
          </HStack>
          <HStack>
            <AiOutlineDislike />
            <Text>{reactions?.dislikes}</Text>
          </HStack>
        </Flex>
      </VStack>
    </Box>
  );
};

export default PostsCard;
