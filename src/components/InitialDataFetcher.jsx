import { useGetUserQuery } from "@/redux/services/userApi";
import { loginSuccess } from "@/redux/slices/authSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const InitialDataFetcher = ({ children }) => {
  const auth = useSelector((state) => state.auth);
  const auth2 = JSON.parse(localStorage.getItem("auth"));
  useGetUserQuery(null, { skip: !auth2?.token || auth?.user?._id });
  const dispatcher = useDispatch();

  useEffect(() => {
    if (!auth?.user && auth2?.token) {
      dispatcher(loginSuccess({ data: auth2 }));
    }
  }, [auth, auth2, dispatcher]);

  return <>{children}</>;
};
