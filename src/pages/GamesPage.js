// import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import loadGames from "../redux/games/sliceGames";
// const API_URL = "https://api.miraplay.cloud";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// const useGames = (
//   page = 1,
//   isFreshGamesFirst = true,
//   genre = "All",
//   gamesToShow = 9
// ) => {
//   return useQuery({
//     queryKey: ["games", page, genre, isFreshGamesFirst, gamesToShow],
//     queryFn: async () => {
//       const response = await fetch(`${API_URL}/games`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           page,
//           isFreshGamesFirst,
//           genre: genre === "ALL" ? false : genre,
//           gamesToShow,
//         }),
//       });

//       return response.json();
//     },
//   });
// };

// const genre = [
//   "ALL",
//   "FREE",
//   "MOBA",
//   "SHOOTERS",
//   "LAUNCHERS",
//   "MMORPG",
//   "STRATEGY",
//   "FIGHTING",
//   "RACING",
//   "SURVIVAL",
//   "ONLINE",
// ];

// const Games = () => {
//   const games = useSelector((state) => state.games.games);
//   const gamesListLength = useSelector((state) => state.games.gamesListLength);
//   const [page, setPage] = useState(1);
//   const [genre, setGenre] = useState("ALL");

//   const dispatch = useDispatch();

//   useEffect(() => dispatch(loadGames({ games })), [dispatch, games]);

//   return (
//     <div>
//       {games.length > 0 && (
//         <ul>
//           {games.map((game) => (
//             <li key={game._id}>
//               <img src={game.gameImage} alt={game.commonGameName} />
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
// export default Games;
function Games() {
  const games = useSelector((state) => state.games.games);
  const { isLoading, error, data } = useQuery(
    ["games", games],
    axios.get("https://api.miraplay.cloud/games"),
    { select: ({ data }) => data }
  );
  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : data ? (
        <h2>Game: {data.commonGameName}</h2>
      ) : (
        <h2>Not found</h2>
      )}
    </div>
  );
}
export default Games;
