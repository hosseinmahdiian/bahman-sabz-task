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
    <Link href={`http://localhost:3000/games${id}`}>
      <Card
        dir="ltr"
        sx={{
          width: 300,
          borderRadius: 3,
          overflow: "hidden",
          bgcolor: "gray",
          color: "white",
          position: "relative",
          textAlign: "left",
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: 170 }}>
          <Image
            src={background_image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw,
         (max-width: 1024px) 50vw,
         (max-width: 1280px) 33vw,
         25vw"
            style={{
              objectFit: "cover",
            }}
          />
        </Box>

        <CardContent>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "nowrap",
              overflow: "hidden",
              gap: 0.5,
              mt: 1,
              height: 24,
            }}
          >
            {genres?.slice(0, 3).map((g) => (
              <Chip
                key={g.name}
                label={g.name}
                size="small"
                sx={{ bgcolor: "#333", color: "white" }}
              />
            ))}
          </Box>

          <Box sx={{ mt: 1, display: "flex", alignItems: "center", gap: 1 }}>
            <Rating value={rating} precision={0.1} readOnly />
            <Typography variant="body2">{rating.toFixed(1)}</Typography>
          </Box>

          <Typography sx={{ mt: 1 }}>
            Metacritic:{" "}
            <span style={{ color: metacritic > 75 ? "#4caf50" : "#ff9800" }}>
              {metacritic}
            </span>
          </Typography>

          <Typography variant="body2" sx={{ opacity: 0.7, mt: 0.5 }}>
            Released: {released}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default GameCard;
