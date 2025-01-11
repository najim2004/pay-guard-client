import { baseApi } from "./baseApi";
import { loginFailure, loginSuccess } from "../slices/authSlice";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: "/users/get-user",
        method: "GET",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          res?.success
            ? dispatch(loginSuccess({ data: res }))
            : dispatch(loginFailure());
        } catch (error) {
          dispatch(loginFailure());
          console.error("Login Error:", error);
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = userApi;
