import React, { useContext, useState } from "react";
import { FaApple, FaFacebookF, FaGoogle } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

import { useForm } from "react-hook-form";
import axios from "../../axios";
import { GlobalContext } from "../../contexts/GlobalContext";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toaster";
import { useNavigate } from "react-router-dom";
import AuthInput from "../../components/onboarding/AuthInput";
import AuthSubmitBtn from "../../components/onboarding/AuthSubmitBtn";
import { AuthMockup } from "../../assets/export";
import PasswordUpdateSuccessModal from "../../components/onboarding/PasswordUpdateSuccessModal";

const UpdatePassword = () => {
  const navigate = useNavigate();
  const [isUpdated, setIsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);

  // Set up react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdatePassword = async (formData) => {
    setLoading(true);
    try {
      let obj = {
        newPassword: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      const response = await axios.post("/auth/forget/update/pass", obj);
      if (response.status === 200) {
        setIsUpdated(true);
        // navigate("/login")
        setLoading(false);
        SuccessToast(response?.data?.message);
      } else {
        SuccessToast(response?.data?.message);
      }
    } catch (err) {
      console.log("🚀 ~ createAccount ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-start justify-start">
      <form
        onSubmit={handleSubmit(handleUpdatePassword)}
        className="w-full lg:w-1/2 h-full bg-[#001229] px-4 py-8 lg:p-20 z-10 flex flex-col overflow-y-auto justify-start items-center gap-8"
      >
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="w-full flex justify-start items-start flex-col"
        >
          <BiArrowBack className="text-3xl text-white" />
        </button>
        <div className="w-full flex justify-start items-start flex-col">
          <h1 className=" text-[48px] font-bold text-white leading-[64.8px] tracking-[-1.2px]">
            Update Your Password
          </h1>
        </div>
        <div className="w-full h-auto flex flex-col my-4 justify-start items-start gap-4">
          <AuthInput
            register={register("password", {
              required: "Please enter your password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            })}
            maxLength={12}
            text={"New Password"}
            placeholder={"Enter Password"}
            type={"password"}
            error={errors.password}
          />
          <AuthInput
            register={register("confirmPassword", {
              required: "Please enter your password.",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long.",
              },
            })}
            maxLength={12}
            text={"Re-enter Password"}
            placeholder={"Re-enter Password"}
            type={"password"}
            error={errors.password}
          />
        </div>

        <AuthSubmitBtn text={"Update Password"} loading={loading} />
        {isUpdated && (
          <PasswordUpdateSuccessModal
            isOpen={isUpdated}
            setIsOpen={setIsUpdated}
          />
        )}
      </form>
      <div className="w-1/2 lg:flex hidden relative h-full">
        <span className="w-20 h-full grad-blur2 absolute top-0 -left-4"></span>
        <img src={AuthMockup} alt="auth_mockup" className="w-full h-full" />
      </div>
    </div>
  );
};

export default UpdatePassword;
