import "./App.css";
import { useDispatch } from "react-redux";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

export const App = () => {
  const dispatch = useDispatch();
  const { isRefreshing } = useAuth();

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return isRefreshing ? (
    <b>Refreshing user...</b>
  ) : (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/auth" />
        <Route path="/games" />
      </Route>
    </Routes>
  );
};
