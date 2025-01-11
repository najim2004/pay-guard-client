import { loginFailure, loginSuccess } from "../slices/authSlice";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials, //example: {"email":"naim.microdeft@gmail.com","password": "12345678"}
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          if (res?.data?.token && res?.status && res?.data?.user) {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                user: {
                  name: res?.data?.user?.name,
                  email: res.data?.user?.email,
                },
                token: res?.data?.token,
              })
            );
          }
          res?.status ? dispatch(loginSuccess(res)) : dispatch(loginFailure());
        } catch (error) {
          dispatch(loginFailure());
          console.error("Login Error:", error);
        }
      },
      invalidatesTags: ["Login"],
    }),
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData, // example:{"name":"Naimul Hasan","email":"naim.microdeft@gmail.com","password": "12345678"}
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
