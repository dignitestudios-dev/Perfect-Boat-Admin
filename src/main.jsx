import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { GlobalContextProvider } from "./contexts/GlobalContext.jsx";
import { Toaster } from "react-hot-toast";
import { BlogContextProvider } from "./contexts/BlogContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <AuthProvider>
          <BlogContextProvider>
            <Toaster />
            <App />
          </BlogContextProvider>
        </AuthProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </StrictMode>
);
