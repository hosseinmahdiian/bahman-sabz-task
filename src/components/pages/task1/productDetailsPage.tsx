"use client";
import { GetSingleProductAPI } from "@/services/GetSingleProduct.api";
import {
  Badge,
  Box,
  HStack,
  IconButton,
  SimpleGrid,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { TbArrowForward } from "react-icons/tb";

type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
};

type Product = {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: { width: number; height: number; depth: number };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[];
  returnPolicy: string;
  minimumOrderQuantity: number;
  images: string[];
  thumbnail: string;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
};

const ProductDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [product, setProducts] = useState<Product>();
  const { data, isPending, isError } = useQuery({
    queryKey: ["product", params.id],
    queryFn: () => GetSingleProductAPI(String(params?.id ?? "")),
    enabled: !!params.id,
  });
  useEffect(() => {
    setProducts(data);
  }, [data]);

  const [current, setCurrent] = useState(0);

  const prevImage = () =>
    product?.images &&
    setCurrent((prev) => (prev === 0 ? product?.images.length - 1 : prev - 1));

  const nextImage = () =>
    product?.images &&
    setCurrent((prev) => (prev === product?.images.length - 1 ? 0 : prev + 1));

  return (
    <Box className="container mx-auto py-10 px-4 !mt-10">
      <Link
        href={"/task1"}
        className="flex items-center gap-2 !mb-5  !border-b-2 !border !border-b-blue-400 animate-theme hover:scale-110 animation-theme text-theme border-theme w-fit !px-4 !py-2 rounded shadow cursor-pointer  bg-dashboard-theme  text-dashboard-theme"
      >
        <TbArrowForward />
        <Text> بازگشت</Text>
      </Link>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap={6} grid="revers">
        <VStack align="start" order={{ base: 2, md: 1 }}>
          <Text as="span" fontSize="2xl" fontWeight="bold">
            {isPending ? <Skeleton height="28px" /> : product?.title}
          </Text>

          <Text
            as="span"
            fontSize="md"
            color={{ base: "gray.600", _dark: "gray.400" }}
            _dark={{ color: "gray.300" }}
          >
            {isPending ? (
              <Skeleton height="20px" w="80%" />
            ) : (
              product?.description
            )}
          </Text>

          <Text as="span" fontSize="xl" fontWeight="bold" color="blue.500">
            {isPending ? (
              <Skeleton height="24px" w="60px" />
            ) : (
              `$${product?.price}`
            )}
          </Text>

          <Text
            as="span"
            fontSize="sm"
            color={{ base: "gray.600", _dark: "gray.400" }}
          >
            برند:{" "}
            {isPending ? <Skeleton height="16px" w="100px" /> : product?.brand}
          </Text>
          <Text
            as="span"
            fontSize="sm"
            color={{ base: "gray.600", _dark: "gray.400" }}
          >
            SKU:{" "}
            {isPending ? <Skeleton height="16px" w="80px" /> : product?.sku}
          </Text>
          <Text
            as="span"
            fontSize="sm"
            color={{ base: "gray.600", _dark: "gray.400" }}
          >
            موجودی:{" "}
            {isPending ? <Skeleton height="16px" w="60px" /> : product?.stock}{" "}
            عدد
          </Text>
          <Text
            as="span"
            fontSize="sm"
            color={{ base: "gray.600", _dark: "gray.400" }}
          >
            دسته‌بندی:{" "}
            {isPending ? (
              <Skeleton height="16px" w="80px" />
            ) : (
              product?.category
            )}
          </Text>

          <HStack wrap="wrap">
            {isPending
              ? Array.from({ length: 2 }).map((_, idx) => (
                  <Skeleton key={idx} h="20px" w="50px" borderRadius="full" />
                ))
              : product?.tags?.map((tag, idx) => (
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
        <Box
          order={{ base: 1, md: 2 }}
          w="full"
          h="full"
          position="relative"
          borderRadius="md"
          overflow="hidden"
        >
          {isPending ? (
            <Skeleton height="400px" w="full" borderRadius="md" />
          ) : (
            <>
              {product?.images?.[current] && (
                <Image
                  src={product?.images[current]}
                  alt={`product-image-${current}`}
                  width={400}
                  height={400}
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "auto",
                  }}
                  loading="eager"
                  className="transition-all  transform duration-300"
                />
              )}

              {product?.images && product?.images?.length > 1 && (
                <HStack
                  position="absolute"
                  top="50%"
                  w="full"
                  justify="space-between"
                  px={2}
                  transform="translateY(-50%)"
                >
                  <LuChevronRight
                    onClick={nextImage}
                    className="cursor-pointer !border hover:scale-110 rounded-lg !text-4xl transition-all  transform duration-300 "
                  />
                  <LuChevronLeft
                    onClick={prevImage}
                    className="cursor-pointer !border hover:scale-110 rounded-lg !text-4xl transition-all  transform duration-300 "
                  />
                </HStack>
              )}
            </>
          )}
        </Box>
      </SimpleGrid>

      <Box my={7} />
      <Box>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          مشخصات تکمیلی
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
          <Text as="span">
            وزن:{" "}
            {isPending ? <Skeleton height="16px" w="60px" /> : product?.weight}{" "}
            گرم
          </Text>
          <Text as="span">
            ابعاد:{" "}
            {isPending ? (
              <Skeleton height="16px" w="100px" />
            ) : (
              `${product?.dimensions?.width} × ${product?.dimensions?.height} × ${product?.dimensions?.depth} mm`
            )}
          </Text>
          <Text as="span">
            گارانتی:{" "}
            {isPending ? (
              <Skeleton height="16px" w="120px" />
            ) : (
              product?.warrantyInformation
            )}
          </Text>
          <Text as="span">
            ارسال:{" "}
            {isPending ? (
              <Skeleton height="16px" w="120px" />
            ) : (
              product?.shippingInformation
            )}
          </Text>
          <Text as="span">
            وضعیت:{" "}
            {isPending ? (
              <Skeleton height="16px" w="80px" />
            ) : (
              product?.availabilityStatus
            )}
          </Text>
          <Text as="span">
            حداقل سفارش:{" "}
            {isPending ? (
              <Skeleton height="16px" w="80px" />
            ) : (
              product?.minimumOrderQuantity
            )}
          </Text>
          <Text as="span">
            سیاست بازگشت:{" "}
            {isPending ? (
              <Skeleton height="16px" w="100px" />
            ) : (
              product?.returnPolicy
            )}
          </Text>
        </SimpleGrid>
      </Box>

      <Box my={7} />

      <Box>
        <Text fontWeight="bold" fontSize="lg" mb={2}>
          نظرات کاربران
        </Text>
        <VStack align="start">
          {isPending
            ? Array.from({ length: 2 }).map((_, idx) => (
                <Skeleton key={idx} height="60px" w="full" borderRadius="md" />
              ))
            : product?.reviews?.map((review, idx) => (
                <Box
                  key={idx}
                  p={4}
                  borderWidth="1px"
                  borderRadius="md"
                  w="full"
                >
                  <Text fontWeight="bold">{review.reviewerName}</Text>
                  <Text
                    fontSize="sm"
                    color={{ base: "gray.600", _dark: "gray.400" }}
                  >
                    {new Date(review.date).toLocaleDateString()} | امتیاز:{" "}
                    {review.rating}
                  </Text>
                  <Text mt={2}>{review.comment}</Text>
                </Box>
              ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default ProductDetailsPage;
