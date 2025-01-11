// Dashboard.jsx
import { Sidebar } from "@/components/dashboard/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import { Outlet } from "react-router-dom";

export const Dashboard = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex h-[calc(100vh-65px)]">
        <Sidebar />
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Dashboard Content */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};
