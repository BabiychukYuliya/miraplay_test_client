import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  games: [],
  gamesListLength: 0,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    loadGames(state, action) {
      state.push(action.payload.games);
      state.gamesListLength = action.payload.gamesListLength;
    },
    resetGames(state) {
      state.games = [];
      state.gamesListLength = 0;
    },
  },
});
export const gamesReducer = gamesSlice;
export const { loadGames, resetGames } = gamesSlice.actions;
