"use client";

import React, { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useQuery } from "@tanstack/react-query";
import CircularProgress from "@mui/material/CircularProgress";
import BarLoader from "react-spinners/BarLoader";
import { GetGamesAPI } from "@/services/GetGames.api";
import { GameCardProps } from "@/templates/gameCord";
import { OrderingType } from "@/types";
import { useRouter } from "next/navigation";
import { FaFilter } from "react-icons/fa6";
import { CiCalendarDate } from "react-icons/ci";
import { BsFillHeartFill } from "react-icons/bs";
import { FaSortAmountDown, FaSortAmountUp } from "react-icons/fa";
import Input from "@/templates/input";

const GameCard = lazy(() => import("@/templates/gameCord"));

export const filterItem = [
  { label: "پیشفرض", icon: "", value: "" },
  {
    label: "تاریخ انتشار",
    icon: <CiCalendarDate />,
    value: "released",
  },
  {
    label: "کمترین امتیاز",
    icon: <FaSortAmountUp />,
    value: "rating",
  },
  {
    label: "بیشترین امتیاز",
    icon: <FaSortAmountDown />,
    value: "-rating",
  },
  {
    label: "محبوب ترین",
    icon: <BsFillHeartFill />,
    value: "-metacritic",
  },
];
export default function GamesPage(searchParams: { ordering: string }) {

  const parentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const [games, setGames] = useState<GameCardProps[]>([]);
  const [searchG, setSearchGames] = useState<GameCardProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [totalGames, setTotalGames] = useState<number>(1);
  const [columnCount, setColumnCount] = useState<number>(1);
  const [ordering, setOrdering] = useState<OrderingType>(
    (searchParams?.ordering as OrderingType) ?? "",
  );
  const [search, setSearch] = useState<string>("");
  const [searchD, setSearchD] = useState<string>("");

  const rowCount = Math.ceil(games.length / columnCount);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 380,
    overscan: 5,
  });

  const onOrderingChange = (item: OrderingType) => {
    const params = new URLSearchParams(searchParams);

    if (item === "") {
      params.delete("ordering");
    } else {
      params.set("ordering", item);
    }

    setOrdering(item);

    router.push(`?${params.toString()}`);
  };

  let timer: ReturnType<typeof setTimeout>;
  const debouncedSearch = (value: string) => {
    setSearch(value.trim());
    clearTimeout(timer);
    timer = setTimeout(() => {
      setSearchD(value);
    }, 500);
  };

  const { data, isFetching, isPending, status, refetch } = useQuery({
    queryKey: ["games", page, ordering, searchD],
    queryFn: () => GetGamesAPI({ page, ordering, search: searchD }),
  });

  useEffect(() => {
    const handleResize = () => {
      if (!parentRef.current) return;

      const width = parentRef.current.clientWidth;
      let cols;
      if (width <= 768) {
        cols = 1;
      } else if (width <= 1024) {
        cols = 2;
      } else if (width <= 1280) {
        cols = 3;
      } else if (width > 1280) {
        cols = 4;
      } else {
        cols = 1;
      }
      setColumnCount(cols);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  useEffect(() => {
    setPage(1);
    setGames([]);
    // refetch();
  }, [ordering, searchD]);

  useEffect(() => {
    if (data?.results) {
      setGames((prev) => [...prev, ...data.results]);
      setTotalGames(data.count);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    const lastItem = rowVirtualizer.getVirtualItems().at(-1);
    if (!lastItem) return;

    if (
      lastItem.index >= rowCount - 2 &&
      !isFetching &&
      games.length < totalGames
    ) {
      setPage((p) => p + 1);
      setLoading(true);
    }
  }, [rowVirtualizer.getVirtualItems(), isFetching]);

  return (
    <Suspense fallback={<div>Loading games...</div>}>
      <div
        className=" mx-auto  min-h-100   "
        ref={parentRef}
        style={{
          height: rowVirtualizer.getTotalSize() + 180,
          minHeight: "full",
          position: "relative",
        }}
      >
        <div className="sticky top-20 pt-1 bg-theme z-40 ">
          <Input
            style=" md:!w-100 !w-[calc(100%-20px)] md:mx-0 !mt-2"
            placeholder="جستوجو"
            data={search}
            FN={(e) => {
              debouncedSearch(e.target.value);
            }}
          />
          <div className="flex items-center px-4 overflow-x-scroll gap-2 py-2  relative  my-2 ">
            <div className=" flex items-center gap-2 ">
              <FaFilter />
              <p className="text-nowrap">فیلتر :</p>
            </div>
            {filterItem.map((item) => (
              <div
                key={item.value}
                onClick={() => {
                  setOrdering(item.value as OrderingType);
                  setTimeout(() => {
                    onOrderingChange(item.value as OrderingType);
                  }, 50);
                }}
                className={` px-3 py-1 h-12  text-gray-200 outline-0 rounded-md  transition cursor-pointer flex items-center gap-3 hover:scale-105 animate-theme
        ${
          ordering === item.value
            ? " text-white bg-gray-500  "
            : "bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
        }
      `}
              >
                {item.icon}
                <p className="text-nowrap"> {item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className=" w-[333px] md:w-[630px] lg:w-[960px] xl:w-[1290px] mx-auto"
          style={{
            position: "relative",
            paddingBottom: "100px",
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const startIndex = virtualRow.index * columnCount;
            const rowItems = games.slice(startIndex, startIndex + columnCount);

            return (
              <div
                key={virtualRow.key}
                className="absolute left-0 w-full px-4 "
                style={{
                  top: virtualRow.start,
                  height: virtualRow.size,
                }}
              >
                <div
                  className="grid gap-4 "
                  style={{
                    gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
                  }}
                >
                  {rowItems.map((game) => (
                    <div key={game.id} className="h-[330px]">
                      <GameCard {...game} />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {isFetching && (
          <div className="w-full flex justify-center py-6 absolute -bottom-4 ">
            <BarLoader color="#78b5d8" />
          </div>
        )}
        {isPending && !isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-theme backdrop-blur-sm">
            <CircularProgress />
          </div>
        )}
      </div>
    </Suspense>
  );
}
