"use client";
import {
  Box,
  ButtonGroup,
  Field,
  IconButton,
  Input,
  Pagination,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetAllProductsAPI } from "@/services/GetAllProducts.api";
import ProductCord from "@/templates/productCord";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";
import ProductCardSkeleton from "@/templates/productCardSkeleton";
import { GetSearchProductsAPI } from "@/services/GetSearchProducts.api";
import { useRouter, useSearchParams } from "next/navigation";

type Product = {
  id: number;
};

const ProductPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState<number>(+(searchParams.get("skip") ?? 1));
  const [total, setTotal] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");

  const maxVisiblePages =
    useBreakpointValue({
      base: 1,
      md: 2,
      lg: 2,
    }) ?? 1;

  const {
    data: dataProducts,
    isPending: isPendingProducts,
    isSuccess: isSuccessProducts,
    isError: isErrorProducts,
  } = useQuery({
    queryKey: ["products", skip],
    queryFn: () =>
      GetAllProductsAPI({
        skip,
      }),
  });

  const {
    data: dataSearchProducts,
    isPending: isPendingSearchProducts,
    isSuccess: isSuccessSearchProducts,
    isError: isErrorSearchProducts,
    refetch: refetchSearchProducts,
  } = useQuery({
    queryKey: ["searchProducts", skip],
    queryFn: () => GetSearchProductsAPI({ search, skip }),
  });

  useEffect(() => {
    if (isErrorSearchProducts || isErrorProducts) throw new Error("متن خطا");
  }, [isErrorSearchProducts]);

  const onPageChange = (page: { page: number; pageSize: number }) => {
    const params = new URLSearchParams(searchParams.toString());
    page.page == 1
      ? params.delete("skip")
      : params.set("skip", String(page.page));
    setSkip(page.page);
    router.push(`?${params.toString()}`);
  };

  let timer: ReturnType<typeof setTimeout>;
  const debouncedSearch = (value: string) => {
    setSearch(value.trim());

    clearTimeout(timer);
    timer = setTimeout(() => {
      refetchSearchProducts();
      setSkip(1);
    }, 500);
  };

  useEffect(() => {
    if (search.trim() == "") {
      setTotal(dataProducts?.total);
      setTotalPages(Math.ceil((dataProducts?.total ?? 0) / 16));
      if (dataProducts?.products) {
        setProducts(dataProducts.products);
      }
    } else {
      setTotal(dataSearchProducts?.total);
      setTotalPages(Math.ceil((dataSearchProducts?.total ?? 0) / 16));

      if (dataSearchProducts?.products) {
        setProducts(dataSearchProducts.products);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [dataProducts, dataSearchProducts]);

  return (
    <Box>
      <Field.Root>
        <Box
          display={"flex"}
          position={"relative"}
          alignItems={"center"}
          justifyItems={"center"}
          width={{ base: "full", lg: "500px" }}
          mt={4}
        >
          <Input
            name="search"
            type={"text"}
            value={search}
            placeholder="جستوجو"
            onChange={(e) => debouncedSearch(e.target.value)}
            width={"full"}
            outline={"none"}
            h="12"
            rounded={"lg"}
          />
        </Box>
      </Field.Root>

      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        w="fit"
        mx="auto"
        gap={4}
        mt={4}
      >
        {isPendingProducts ? (
          Array.from({ length: 16 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : isSuccessProducts && products?.length > 0 ? (
          products?.map((item) => <ProductCord key={item.id} item={item} />)
        ) : (
          <Box>
            <Text>موردی یافت نشد</Text>
          </Box>
        )}
      </SimpleGrid>

      {products?.length > 0 && (
        <Pagination.Root
          count={total}
          page={skip}
          pageSize={16}
          siblingCount={maxVisiblePages}
          onPageChange={(page) => onPageChange(page)}
          mx="auto"
          my={4}
          width="fit"
        >
          <ButtonGroup variant="outline" size="sm">
            <Pagination.PrevTrigger
              display={{ base: "none", lg: "flex" }}
              asChild
            >
              <IconButton>
                <LuChevronLeft />
              </IconButton>
            </Pagination.PrevTrigger>

            <Pagination.Items
              render={(page) => {
                return (
                  <IconButton
                    key={page.value}
                    variant={page.value === skip ? "solid" : "outline"}
                  >
                    {page.value}
                  </IconButton>
                );
              }}
            />

            <Pagination.NextTrigger
              display={{ base: "none", lg: "flex" }}
              asChild
            >
              <IconButton>
                <LuChevronRight />
              </IconButton>
            </Pagination.NextTrigger>
          </ButtonGroup>
        </Pagination.Root>
      )}
    </Box>
  );
};

export default ProductPage;
