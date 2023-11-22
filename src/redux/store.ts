import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/sliceAuth";
import { gamesReducer } from "./games/sliceGames";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./auth/operations.ts";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const rootReducer = combineReducers({
  [authReducer.name]: authReducer.reducer,
  [gamesReducer.name]: gamesReducer.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["token"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: {
    authApi: persistedReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});
// export const persistor = persistStore(store, null, () => {console.log('Rehydrated')});
const persistor = persistStore(store);

export { store, persistor };
setupListeners(store.dispatch);
