import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const API_URL = "https://api.miraplay.cloud";

const useGames = (
  page = 1,
  isFreshGamesFirst = true,
  genre = "All",
  gamesToShow = 9
) => {
  return useQuery({
    queryKey: ["games", page, genre, isFreshGamesFirst, gamesToShow],
    queryFn: async () => {
      const response = await fetch(`${API_URL}/games/by_page`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          page,
          isFreshGamesFirst,
          genre: genre === "ALL" ? false : genre,
          gamesToShow,
        }),
      });

      return response.json();
    },
  });
};

const genre = [
  "ALL",
  "FREE",
  "MOBA",
  "SHOOTERS",
  "LAUNCHERS",
  "MMORPG",
  "STRATEGY",
  "FIGHTING",
  "RACING",
  "SURVIVAL",
  "ONLINE",
];

const Games = () => {
  const games = useSelector((state) => state.games.games);
  const gamesListLength = useSelector((state) => state.games.gamesListLength);
  const [page, setPage] = useState(1);
  const [genre, setGenre] = useState("ALL");

  const dispatch = useDispatch();
  return (
    <div>
      {games.length > 0 && (
        <ul>
          {games.map((game) => (
            <li key={game._id}>
              <img src={game.gameImage} alt={game.commonGameName} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Games;
