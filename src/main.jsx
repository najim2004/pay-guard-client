import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "./components/ui/toaster";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { InitialDataFetcher } from "./components/InitialDataFetcher";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <InitialDataFetcher>
          <AppRouter />
        </InitialDataFetcher>
      </BrowserRouter>
      <Toaster />
    </Provider>
  </StrictMode>
);
