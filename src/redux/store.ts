import { combineReducers } from "redux";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { authReducer } from "./auth/sliceAuth";
import { gamesReducer } from "./games/sliceGames";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "./auth/operations.ts";

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authApi.middleware),
});
// export const persistor = persistStore(store, null, () => {console.log('Rehydrated')});
const persistor = persistStore(store);

export { store, persistor };
setupListeners(store.dispatch);
