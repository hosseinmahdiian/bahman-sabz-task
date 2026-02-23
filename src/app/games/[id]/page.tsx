import GameDetailsPage from "@/pages/task2/gameDetailsPage";

type Props = { params: { id: string } };

export default async function Home({ params }: Props) {
  const id = await params;

  return <GameDetailsPage id={id?.id} />;
}
