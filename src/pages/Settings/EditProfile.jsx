import React, { useEffect, useState } from "react";
import AuthInput from "../../components/onboarding/AuthInput";
import { Link, useNavigate } from "react-router-dom";

import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toaster";

const EditProfile = () => {
  const navigation = useNavigate();
  const [loader, setLoader] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const getProfileDetail = async () => {
    try {
      const { data } = await axios.get(`/admin/profile`);
      setProfileData({
        name: data?.data?.name,
        email: data?.data?.email,
        password: data?.data?.password,
      });
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const handleupdateProfile = async () => {
    setLoader(true);

    try {
      await axios.put(`/admin/profile`, {
        email: profileData?.email,
        password: profileData?.password,
      });
    SuccessToast("Profile updated successfully!");
      navigation("/profile");
    } catch (error) {
      console.error("Error updating profile data:", error);
      ErrorToast("Failed to update profile. Please try again.");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getProfileDetail();
  }, []);

  return (
    <>
      <div className="bg-[#001229] rounded-[18px] p-4">
        <div>
          <h2 className="text-[18px] font-[700] p-4">Edit Profile</h2>
        </div>
        <div className="grid grid-cols-12 gap-4 p-4">
          <div className="col-span-6">
            <div className="mt-3">
              <AuthInput
                text={"Name"}
                placeholder={"Mark Taylor"}
                type={"text"}
                value={profileData?.name}
              />
            </div>
            <div className="mt-3">
              <AuthInput
                text={"Password"}
                placeholder={"Enter new password"}
                type={"password"}
                value={profileData?.password}
                onChange={(e) =>
                  setProfileData((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>
          </div>
          <div className="col-span-6">
            <div className="mt-3">
              <AuthInput
                text={"Email"}
                placeholder={"mark@gmail.com"}
                type={"text"}
                value={profileData?.email}
                onChange={(e) =>
                  setProfileData((prev) => ({ ...prev, email: e.target.value }))
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 flex-wrap">
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#02203A] w-[235px] h-[54px] rounded-[8px] text-[#199BD1] font-[700]"
            onClick={() => navigation("/profile")}
          >
            Back
          </button>
        </div>
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#199BD1] w-[235px] h-[54px] rounded-[8px] text-white"
            onClick={() => handleupdateProfile()}
          >
            <button className="bg-[#199BD1] w-[235px] h-[54px] rounded-[8px] text-white flex items-center justify-center">
              {loader ? (
                <div className="spin w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Save"
              )}
            </button>
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
