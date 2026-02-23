"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useQuery } from "@tanstack/react-query";
import React, { lazy, useEffect, useRef, useState } from "react";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import BarLoader from "react-spinners/BarLoader";
import { GetGamesAPI } from "@/services/GetGames.api";
import { GameCardProps } from "@/templates/gameCord";
import { OrderingType } from "@/types";

const GameCard = lazy(() => import("@/templates/gameCord"));

export default function GamesPage() {
  const parentRef = useRef<HTMLDivElement>(null);

  const [games, setGames] = useState<GameCardProps[]>([]);
  const [searchG, setSearchGames] = useState<GameCardProps[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [totalGames, setTotalGames] = useState<number>(1);
  const [columnCount, setColumnCount] = useState<number>(4);
  const [ordering, setOrdering] = useState<OrderingType>("");
  const [search, setSearch] = useState<string>("");

  const rowCount = Math.ceil(games.length / columnCount);
  const rowVirtualizer = useVirtualizer({
    count: rowCount,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 400,
    overscan: 5,
  });

  const {
    data: dataSearch,
    isFetching: isFetchingSearch,
    isPending: isPendingSearch,
  } = useQuery({
    queryKey: ["searchGames", page, ordering],
    queryFn: () => GetGamesAPI({ page, ordering }),
    // enabled: false,
  });

  const { data, isFetching, isPending } = useQuery({
    queryKey: ["games", page, ordering],
    queryFn: () => GetGamesAPI({ page, ordering }),
    // enabled: false,
  });

  useEffect(() => {
    if (data?.results) {
      setGames((prev) => [...prev, ...data.results]);
      setTotalGames(data.count);
      setLoading(false);
    }
  }, [data]);

  useEffect(() => {
    const handleResize = () => {
      if (!parentRef.current) return;

      const width = parentRef.current.clientWidth;
      let cols;
      if (width <= 768) {
        cols = 2;
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
  }, []);

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
    <div
      className=" mx-auto  min-h-full"
      ref={parentRef}
      style={{
        height: rowVirtualizer.getTotalSize(),
        minHeight: "full",
        position: "relative",
      }}
    >
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
        <div className="w-full flex justify-center py-6 absolute -bottom-2 ">
          <BarLoader color="#5becf6" />
        </div>
      )}
      {isPending && !isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
