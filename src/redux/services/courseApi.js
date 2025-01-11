import {
  addCourse,
  setCourses,
  setError,
  setLoading,
} from "../slices/courseSlice";
import { baseApi } from "./baseApi";

export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCourses: builder.query({
      query: () => "/course",
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          dispatch(setLoading(true));
          const { data: res } = await queryFulfilled;
          res?.status
            ? dispatch(setCourses(res?.data?.data))
            : dispatch(setError(res?.status_message));
        } catch (error) {
          dispatch(
            setError(
              error?.message ||
                "An error occurred! Please login and reload the page! Because authentication token need."
            )
          );
          console.error("Course fetch error:", error);
        } finally {
          dispatch(setLoading(false));
        }
      },
      providesTags: ["Login"],
    }),
    addCourse: builder.mutation({
      query: (data) => ({
        url: "/course",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data: res } = await queryFulfilled;
          res?.status
            ? dispatch(addCourse(res?.data))
            : dispatch(setError(res?.status_message));
        } catch (error) {
          dispatch(setError(error?.message));
          console.error("Course addition error:", error);
        } finally {
          dispatch(setLoading(false));
        }
      },
    }),
  }),
});

export const { useAddCourseMutation, useGetAllCoursesQuery } = courseApi;
