"use client";
import { GetGamesAPI } from "@/services/GetGames.api";
import Filter from "@/templates/filter";
import Input from "@/templates/input";
import { OrderingType } from "@/types";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";

const GamesPage = () => {
  const [games, setGames] = useState<object[]>([]);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<30 | 50 | 100>(30);
  const [totalGames, setTotalGames] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState<string>("");
  const [ordering, setOrdering] = useState<OrderingType>("");
  const [filter1, setFilter1] = useState<boolean>(false);

  const {
    data: dataSearchGames,
    isPending: isPendingSearchGames,
    isSuccess: isSuccessSearchGames,
    refetch: refetchSearchGames,
  } = useQuery({
    queryKey: ["games", page, pageSize, ordering],
    queryFn: () => GetGamesAPI({ page, page_size: pageSize, search, ordering }),
    enabled: false,
  });

  useEffect(() => {
    setTotalGames(dataSearchGames?.count);
    setTotalPages(Math.ceil((dataSearchGames?.count ?? 0) / pageSize));
    if (dataSearchGames?.results) {
      setGames(dataSearchGames.results);
    }
  }, [dataSearchGames]);

  const items = [
    { name: "1", id: 1 },
    { name: "2", id: 2 },
    { name: "3", id: 3 },
  ];
  return (
    <div className="border h-full px-4 2xl:px-5">
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Input
          placeholder="جستوجو"
          style=" md:col-span-2 lg:col-span-1 "
          data={search}
          FN={(e) => setSearch(e.target.value)}
        />

        <Filter title="نمایش" items={items} FN={setFilter1} open={filter1} />
      </div>
    </div>
  );
};

export default GamesPage;
