import "./App.css";
// import { useDispatch } from "react-redux";
// import { useAuth } from "./hooks/useAuth";
// import { useEffect } from "react";
import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";

const HomePage = lazy(() => import("./pages/HomePage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const GamesPage = lazy(() => import("./pages/GamesPage"));
export const App = () => {
  // const dispatch = useDispatch();
  // const { isRefreshing } = useAuth();

  // useEffect(() => {
  //   dispatch(refreshUser());
  // }, [dispatch]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/games" element={<GamesPage />} />
      </Route>
    </Routes>
  );
};
