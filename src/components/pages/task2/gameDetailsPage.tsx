import { GetSingleGameAPI } from "@/services/GetSingleGame.api";
import { Skeleton } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { BiArrowBack } from "react-icons/bi";

const GameDetailsPage = async (id: { id: string }) => {
  let game = null;
  try {
    game = await GetSingleGameAPI(id?.id);
  } catch (error) {}

  if (game == null) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-6">
        <Skeleton variant="rectangular" height={400} className="rounded-2xl" />

        <Skeleton variant="text" height={50} width="60%" />

        <div className="flex gap-4">
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={120} />
          <Skeleton variant="text" width={120} />
        </div>

        <Skeleton variant="rectangular" height={150} className="rounded-xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <div className="relative w-full h-[420px] overflow-hidden">
        <Link
          href="/games"
          className="absolute scale-200 top-4 border-theme border bg-theme right-10 z-20 rounded-full border w-fit h-fit aspect-square "
        >
          <BiArrowBack className="rotate-180 " />
        </Link>
        <Image
          src={game.background_image}
          alt={game.name}
          fill
          priority
          className="object-none scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-6xl px-6">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
            {game.name}
          </h1>

          <div className="flex flex-wrap gap-3 mt-4">
            {game.genres?.map((g: any) => (
              <span
                key={g.id}
                className="px-4 py-1 rounded-full text-sm bg-white/10 backdrop-blur-md border border-white/20"
              >
                {g.name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <section className="bg-white dark:bg-white/5 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10">
            <h2 className="text-2xl font-bold mb-5">درباره بازی</h2>
            <p className="leading-8 whitespace-pre-line text-gray-700 dark:text-gray-300">
              {game.description_raw}
            </p>
          </section>

          {game.background_image_additional && (
            <section>
              <h2 className="text-2xl font-bold mb-5">تصویر بازی</h2>
              <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src={game.background_image_additional}
                  alt="screenshot"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </section>
          )}
        </div>

        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-md border border-white/10 shadow-lg">
            <p className="text-sm opacity-70">امتیاز</p>
            <p className="text-3xl font-bold mt-2">{game.rating.toFixed(1)}</p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-yellow-500/20 backdrop-blur-md border border-white/10 shadow-lg">
            <p className="text-sm opacity-70">محبوبیت</p>
            <p
              className={`text-3xl font-bold mt-2 ${
                game.metacritic > 75 ? "text-green-400" : "text-orange-400"
              }`}
            >
              {game.metacritic ?? "N/A"}
            </p>
          </div>

          {/* Platforms */}
          <div className="bg-white dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg">
            <p className="text-sm opacity-70 mb-4">قابلیت استفاده در</p>
            <div className="flex flex-wrap gap-2">
              {game.platforms?.map((p: any) => (
                <span
                  key={p.platform.id}
                  className="px-3 py-1 bg-gray-200 dark:bg-white/10 rounded-full text-sm"
                >
                  {p.platform.name}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg">
            <p className="text-sm opacity-70">تاریخ عرضه</p>
            <p className="text-lg font-semibold mt-1">{game.released}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
