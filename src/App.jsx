import { Route, Routes } from "react-router-dom";
import "./App.css";
import { routes } from "./constant/routes";
import Splash from "./pages/onboarding/Splash";

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      {routes?.map((route, key) => (
        <Route path={route?.url} element={route?.page} key={key} />
      ))}
    </Routes>
  );
}

export default App;
