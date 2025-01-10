import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./constant/routes";
import Splash from "./pages/onboarding/Splash";
import { authRoutes } from "./constant/authRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      {authRoutes?.map((route) => {
        return (
          <Route path={route?.url} element={route?.page} key={route?.title} />
        );
      })}
      {routes?.map((route, key) => (
        <Route path={route?.url} element={route?.page} key={key} />
      ))}
    </Routes>
  );
}

export default App;
