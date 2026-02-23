import {
  Card,
  CardContent,
  CardMedia,
  Box,
  Typography,
  Chip,
  Rating,
  useTheme,
  Skeleton,
} from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export interface GameCardProps {
  id: number | string;
  name: string;
  background_image: string;
  rating: number;
  metacritic: number;
  released: string;
  genres: { name: string }[];
}

const GameCard = ({
  name,
  background_image,
  rating,
  metacritic,
  released,
  genres,
  id,
}: GameCardProps) => {
  return (
    <Link href={`/games/${id}`} className="block w-[300px]">
      <div className="rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white relative text-left shadow-lg hover:scale-[1.02] transition-transform duration-300">
        <div className="relative w-full h-[170px]">
          <Image
            src={background_image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw,
        (max-width: 1024px) 50vw,
        (max-width: 1280px) 33vw,
        25vw"
            className="object-cover"
          />
        </div>

        <div className="p-4">
          <h3 className="font-bold text-lg line-clamp-1">{name}</h3>

          <div className="flex flex-nowrap overflow-hidden gap-1 mt-2 h-6">
            {genres?.slice(0, 3).map((g) => (
              <span
                key={g.name}
                className="text-xs px-2 py-0.5 rounded-full bg-gray-500 text-gray-200 whitespace-nowrap flex items-center"
              >
                {g.name}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex text-yellow-400 text-sm">
              {"★".repeat(Math.round(rating))}
            </div>
            <span className="text-sm">{rating.toFixed(1)}</span>
          </div>

          <p className="mt-2 text-sm">
            Metacritic:{" "}
            <span
              className={
                metacritic > 75
                  ? "text-green-500 font-semibold"
                  : "text-orange-400 font-semibold"
              }
            >
              {metacritic}
            </span>
          </p>

          <p className="text-sm opacity-70 mt-1">Released: {released}</p>
        </div>
      </div>
    </Link>
  );
};

export default GameCard;
