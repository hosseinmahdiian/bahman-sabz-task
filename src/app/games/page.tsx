import GamesPage from "@/pages/task2/gamesPage";
import { OrderingType } from "@/types";

type Props = {
  searchParams?: {
    ordering?: OrderingType;
  };
};

export default async function Page({ searchParams }: Props) {
  const ordering = await searchParams;

  return <GamesPage ordering={String(ordering?.ordering)} />;
}
