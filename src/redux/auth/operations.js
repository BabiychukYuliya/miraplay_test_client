import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import axios from "axios";
import { loadUser } from "../auth/sliceAuth/loadUser";
import { useDispatch } from "react-redux";
axios.defaults.baseURL = "localhost:3000";

async function signUp(email, password) {
  const response = await fetch(`${axios.defaults.baseURL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Failed on sign up request");

  return await response.json();
}

export function useSignUp() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { mutate: signUpMutation } = useMutation(
    ({ email, password }) => signUp(email, password),
    {
      onSuccess: (data) => {
        dispatch(
          loadUser({
            user: data.user,
            token: data.token,
          })
        );
        queryClient.setQueriesData("currentUser", data.user);
      },
      onError: (error) => {
        toast.error("Ops.. Error on sign up. Try again!");
      },
    }
  );

  return signUpMutation;
}

//
async function signIn(email, password) {
  const response = await fetch(`${axios.defaults.baseURL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error("Failed on sign in request");

  return await response.json();
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const { mutate: signInMutation } = useMutation(
    ({ email, password }) => signIn(email, password),
    {
      onSuccess: (data) => {
        dispatch(
          loadUser({
            user: data.user,
            token: data.token,
          })
        );
        queryClient.setQueriesData("currentUser", data.user);
      },
      onError: (error) => {
        toast.error("Ops.. Error on sign in. Try again!");
      },
    }
  );

  return signInMutation;
}
