import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/sliceAuth";
import gamesReducer from "./games/sliceGames";

const rootReducer = combineReducers({
  auth: authReducer,
  games: gamesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
});
// export const persistor = persistStore(store, null, () => {console.log('Rehydrated')});
const persistor = persistStore(store);

export { store, persistor };
