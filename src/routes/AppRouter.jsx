import { Routes, Route } from "react-router-dom";
import { App } from "../App";
import { Login } from "@/pages/auth/Login";
import { Signup } from "@/pages/auth/Signup";
import { Dashboard } from "@/pages/dashboard/Dashboard";
import { Payments } from "@/pages/dashboard/pages/payments/Payments";
import { Documents } from "@/pages/dashboard/pages/documents/Documents";
import { DHome } from "@/pages/dashboard/pages/home/DHome";
import { Users } from "@/pages/dashboard/pages/users/Users";

const AppRouter = () => {
  return (
    <Routes>
      {/* Set the App component as the wrapper route */}
      <Route path="/" element={<App />}>
        {/* Set the Home component inside the "/" path */}
        {/* <Route index element={<Home />} />*/}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/dashboard" element={<Dashboard />}>
        <Route path="/dashboard" element={<DHome />} />
        <Route path="/dashboard/payments" element={<Payments />} />
        <Route path="/dashboard/documents" element={<Documents />} />
        <Route path="/dashboard/users" element={<Users />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
