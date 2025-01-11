import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { Footer } from "./components/footer/Footer";

export const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
