import { useQuery } from "@tanstack/react-query";
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

export default useGames;
