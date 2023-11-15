import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ToasterNotify } from "components/Notify/Notify";
import axios from "axios";

axios.defaults.baseURL = "https://api.miraplay.cloud/games/by_page";

const setAuthHeader = (token) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
};

const queryClient = useQueryClient();

export const register = useMutation(
  "register",
  async (credentials) => {
    const res = await axios.post(
      `$(axios.defaults.baseURL)/register`,
      credentials
    );
    setAuthHeader(res.data.token);
    return res.data;
  },
  {
    onError: (error) => {
      ToasterNotify(error.response.data.message);
    },
    onSuccess: () => {
      ToasterNotify("AccountСreated");
      queryClient.invalidateQueries("user"); // Приклад інвалідації кешу для оновлення даних користувача після реєстрації
    },
  }
);

export const logIn = useMutation(
  "login",
  async (credentials) => {
    const res = await axios.post("/api/users/login", credentials);
    setAuthHeader(res.data.token);
    return res.data;
  },
  {
    onError: (error) => {
      ToasterNotify("Password or email is incorrect");
    },
    onSuccess: () => {
      ToasterNotify("LoginSuccessful");
      queryClient.invalidateQueries("user"); // Приклад інвалідації кешу для оновлення даних користувача після входу
    },
  }
);
