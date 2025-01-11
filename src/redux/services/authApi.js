import { loginFailure, loginSuccess } from "../slices/authSlice";
import { baseApi } from "./baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          if (res?.data?.token && res?.success && res?.data?.user) {
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
          res?.success ? dispatch(loginSuccess(res)) : dispatch(loginFailure());
        } catch (error) {
          dispatch(loginFailure());
          console.error("Login Error:", error);
        }
      },
      invalidatesTags: ["Login"],
    }),
    register: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation } =
  authApi;
