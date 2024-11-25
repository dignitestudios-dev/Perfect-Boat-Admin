import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import AuthInput2 from "../onboarding/AuthInput2";
import AuthSubmitBtn from "../onboarding/AuthSubmitBtn";
import UpdatePassword from "../Modal/UpdatePassword";
import CustomBtn from "../onboarding/CustomBtn";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../Toaster/Toaster";
import axios from "../../axios";
import { FiLoader } from "react-icons/fi";

const UserChangePass = () => {
  const [tab, setTabs] = useState("1");
  const [updateOpen, setUpdateOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUpdatePassword = async (formData) => {
    setLoading(true);
    try {
      // const fcmToken = await getFCMToken();
      let obj = {
        currentPassword: formData.currPassword,
        newPassword: formData.newPassword,
        confirmPassword: formData.confPassword,
      };

      const response = await axios.post("/auth/change/password", obj);
      console.log("🚀 ~ handleUpdatePassword ~ response:", response);
      if (response.status === 200) {
        SuccessToast("Password Reset Successfully");
        reset();
      }
    } catch (err) {
      console.log("🚀 ~ handleUpdatePassword ~ err:", err);
      ErrorToast(err?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-start min-h-screen pt-4">
        <div className="w-[536px] h-[565px] bg-[#1A293D] rounded-[18px] flex flex-col items-center justify-center">
          <div className="text-center text-[20px] font-[700] text-white mb-8">
            Update Password
          </div>
          <form onSubmit={handleSubmit(handleUpdatePassword)}>
            <div className="w-full px-12 flex flex-col items-center">
              <div className="w-full mb-5">
                <AuthInput
                  text={"Current Password"}
                  type={"password"}
                  isAuth={false}
                  register={register("currPassword", {
                    required: "Please enter your password.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long.",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  })}
                  maxLength={12}
                  error={errors.currPassword}
                />
              </div>
              <div className="w-full mb-5">
                <AuthInput
                  text={"New Password"}
                  type={"password"}
                  isAuth={false}
                  register={register("newPassword", {
                    required: "Please enter your password.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long.",
                    },
                  })}
                  maxLength={12}
                  error={errors.newPassword}
                />
              </div>
              <div className="w-full mb-5">
                <AuthInput
                  text={"Confirm Password"}
                  type={"password"}
                  isAuth={false}
                  register={register("confPassword", {
                    required: "Please enter your password.",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters long.",
                    },
                  })}
                  maxLength={12}
                  error={errors.confPassword}
                />
              </div>
              <button
                type="submit"
                className="bg-[#199BD1] w-[434px] h-[50px] rounded-[8px] font-[700] text-[16px] text-white flex items-center justify-center leading-[21.6px] tracking-[-0.24px]"
                // onClick={() => setUpdateOpen(true)}
              >
                <div className="flex items-center">
                  <span className="mr-1"> Update Password</span>
                  {loading && (
                    <FiLoader className="animate-spin text-lg mx-auto" />
                  )}
                </div>
              </button>
              {/* <div className="text-center mt-4">
                <button
                  type="button"
                  className="text-[#199BD1] text-[16px] underline font-[700]"
                  onClick={() => setTabs("1")}
                >
                  Back
                </button>
              </div> */}
            </div>
          </form>
        </div>
      </div>
      {/* {tab === "1" && (
        <>
          <div className="flex  justify-between">
            <div>
              <h2 className="text-[24px] font-[700]">Password</h2>
            </div>
            <div>
              <button
                className="bg-[#199BD1] w-[158px] h-[34px] rounded-[10px] text-[13px] font-[700]"
                onClick={() => setTabs("2")}
              >
                Change Password
              </button>
            </div>
          </div>
          <div className="mt-5">
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
          </div>
        </>
      )} */}
      {/* {tab === "2" && (
        
      )} */}
      <UpdatePassword
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
      />
    </div>
  );
};

export default UserChangePass;
