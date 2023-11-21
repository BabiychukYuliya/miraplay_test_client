import { createSlice } from "@reduxjs/toolkit";

const gamesSlice = createSlice({
  name: "games",
  initialState: {
    games: [],
    gamesListLength: 0,
  },
  reducers: {
    loadGames(state, action) {
      state.games.push(action.payload.games);
      state.gamesListLength = action.payload.gamesListLength;
    },
    resetGames(state) {
      state.games = [];
      state.gamesListLength = 0;
    },
  },
});

export const { loadGames, resetGames } = gamesSlice.actions;
export const gamesReducer = gamesSlice;
