// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { toast } from "react-hot-toast";
// import axios from "axios";
// import { loadUser } from "./sliceAuth";
// import { useDispatch, useSelector } from "react-redux";
// axios.defaults.baseURL = "http://localhost:3000";

// async function signUp(email, password) {
//   const response = await fetch(`${axios.defaults.baseURL}/register`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });
//   if (!response.ok) throw new Error("Failed on sign up request");

//   return await response.json();
// }

// export function useSignUp() {
//   const queryClient = useQueryClient();
//   const dispatch = useDispatch();

//   const { mutate: signUpMutation } = useMutation(
//     ({ email, password }) => signUp(email, password),
//     {
//       onSuccess: (data) => {
//         dispatch(
//           loadUser({
//             user: data.user,
//             token: data.token,
//           })
//         );
//         queryClient.setQueriesData("currentUser", data.user);
//       },
//       onError: (error) => {
//         toast.error("Ops.. Error on sign up. Try again!");
//       },
//     }
//   );

//   const signUpUser = async ({ email, password }) => {
//     return signUpMutation.mutateAsync({ email, password });
//   };
//   return signUpUser;
// }

// //
// async function signIn(email, password) {
//   const response = await fetch(`${axios.defaults.baseURL}/login`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email, password }),
//   });
//   if (!response.ok) throw new Error("Failed on sign in request");

//   return await response.json();
// }

// export function useSignIn() {
//   const queryClient = useQueryClient();
//   const dispatch = useDispatch();
//   const { mutate: signInMutation } = useMutation(
//     ({ email, password }) => signIn(email, password),
//     {
//       onSuccess: (data) => {
//         dispatch(
//           loadUser({
//             user: data.user,
//             token: data.token,
//           })
//         );
//         queryClient.setQueriesData("currentUser", data.user);
//       },
//       onError: (error) => {
//         toast.error("Ops.. Error on sign in. Try again!");
//       },
//     }
//   );

//   const signInUser = async ({ email, password }) => {
//     return signInMutation.mutateAsync({ email, password });
//   };
//   return signInUser;
// }
// //
// // async function logOut() {
// //   const { token } = useSelector((state) => state.auth);
// //   const response = await fetch(`${axios.defaults.baseURL}/logout`, {
// //     method: "POST",
// //     headers: {
// //       Authorization: `Bearer ${token}`,
// //     },
// //   });
// //   if (!response.ok) throw new Error("Failed on sign in request");

// //   return await response.json();
// // }
// //
// export const useCurrentUser = () => {
//   const { token } = useSelector((state) => state.auth);

//   return useQuery({
//     queryKey: ["currentUser"],
//     queryFn: async () => {
//       if (!token) {
//         return null;
//       }
//       const res = await fetch(`${axios.defaults.baseURL}/current`, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (!res.ok) {
//         throw new Error("Unable to fetch user");
//       }
//       return await res.json();
//     },
//   });
// };
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000" }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (body: { email: string; password: string }) => {
        return {
          url: "/sigin",
          method: "POST",
          body,
        };
      },
    }),
  }),
});
export const { useLoginUserMutation } = authApi;