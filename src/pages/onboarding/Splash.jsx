import React, { useEffect } from "react";
import { SplashLogo } from "../../assets/export";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="bg-[#001229] w-screen h-screen flex flex-col gap-32 justify-center items-center relative">
      <span className="w-[396px] h-[396px] rounded-full bg-[#00638C] blur-[105px] flex items-center justify-center absolute" />
      <img
        src={SplashLogo}
        alt="splash_logo"
        className="z-50 w-[331.88px] h-[195px]"
      />
    </div>
  );
};

export default Splash;
