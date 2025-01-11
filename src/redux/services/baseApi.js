import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://react-interview.crd4lc.easypanel.host/api",
    prepareHeaders: async (headers, { getState }) => {
      const token = await JSON.parse(localStorage.getItem("auth"))?.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Login"],
  endpoints: () => ({}),
});
