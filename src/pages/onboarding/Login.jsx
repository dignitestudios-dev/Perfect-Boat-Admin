import React, { useContext, useState } from "react";
import { AuthMockup } from "../../assets/export";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "../../axios";
import { ErrorToast } from "../../components/Toaster/Toaster";
import { AuthContext } from "../../contexts/AuthContext";
import getFCMToken from "./../../firebase/getFcmToken";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      const fcmToken = await getFCMToken();
      let obj = {
        email: formData.email,
        password: formData.password,
        fcmToken: fcmToken,
        role: "admin",
      };

      const response = await axios.post("/auth/signIn", obj);
      if (response.status === 200) {
        login(response?.data);
        navigate("/home");
      }
    } catch (err) {
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={handleSubmit(handleLogin)}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <h1 className="w-full justify-start items-start text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
          Log in
        </h1>
        <div className="w-full h-auto flex flex-col justify-start items-start gap-4">
          <AuthInput
            register={register("email", {
              required: "Please enter your email address.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address.",
              },
            })}
            text={"Email"}
            placeholder={"Enter your email here"}
            type={"text"}
            error={errors.email}
          />
          <div className="w-full lg:w-[434px] flex flex-col justify-start items-end gap-1">
            <AuthInput
              register={register("password", {
                required: "Please enter your password.",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long.",
                },
              })}
              maxLength={12}
              text={"Password"}
              placeholder={"Enter your password here"}
              type={"password"}
              error={errors.password}
            />
            <button
              onClick={() => navigate("/forgot-password")}
              className="text-[13px] font-medium text-[#fff]"
            >
              Forgot Password?
            </button>
          </div>
        </div>

        <AuthSubmitBtn text={"Log in"} loading={loading} />
      </form>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full bg-gradient-to-r from-black/70 via-black/30 to-black/0  absolute top-0 -left-4"></span>
        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default Login;
