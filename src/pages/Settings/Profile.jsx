import React, { useContext, useEffect, useState } from "react";
import { Camera } from "../../assets/export"; // Assuming ProfileImg isn't used
import AuthInput2 from "../../components/onboarding/AuthInput2";
import { useNavigate } from "react-router-dom";
import axios from "../../axios";
import { ErrorToast, SuccessToast } from "../../components/Toaster/Toaster";
import { GlobalContext } from "../../contexts/GlobalContext";

const Profile = () => {
  const { setProfilepic } = useContext(GlobalContext);
  const navigation = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getProfileDetail = async () => {
    try {
      const { data } = await axios.get(`/admin/profile`);
      setProfileData(data?.data);
      setProfilepic(data?.data?.profilePicture);
      setPreviewImage(data?.data?.profilePicture);
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  useEffect(() => {
    getProfileDetail();
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setIsLoading(true);
      await handleUpdateProfile(file);
      setIsLoading(false);
    }
  };

  const handleUpdateProfile = async (file) => {
    const formData = new FormData();
    formData.append("picture", file);

    try {
      const response = await axios.put("/admin/profile/picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      SuccessToast("Profile picture updated successfully!");
      getProfileDetail();
    } catch (error) {
      console.error("Error updating profile picture:", error);
      ErrorToast("Failed to update profile picture. Please try again.");
    }
  };

  return (
    <div className="bg-[#001229] p-4 rounded-[18px]">
      <h1 className="text-[18px] font-[700] mb-3 mx-4">Profile</h1>
      <div className="h-[815px] bg-[#1A293D] lg:w-[923px] rounded-[32px]">
        <div className="h-auto w-full flex flex-col justify-start items-center">
          <div className="w-full h-[219px] rounded-t-[18px] bg-gradient text-white"></div>
          <div className="absolute top-[210px] left-[120px]">
            <div className="relative w-[158px] h-[158px]">
              {isLoading ? (
                <div className="w-full h-full rounded-full border-4 border-gray-800 flex items-center justify-center bg-gray-300">
                  <span className="spin w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></span>
                </div>
              ) : (
                <img
                  src={previewImage || "https://placehold.co/400"}
                  alt="Profile"
                  className="w-full h-full rounded-full border-4 border-gray-800"
                />
              )}
              <label
                htmlFor="profileImageInput"
                className="absolute bottom-4 w-[27.98px] text-center justify-center flex items-center h-[27.98px] right-1 bg-[#199BD1] rounded-full cursor-pointer"
              >
                <img
                  src={Camera}
                  className="w-[14.81px] h-[14.81px]"
                  alt="Camera Icon"
                />
              </label>
              <input
                type="file"
                id="profileImageInput"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </div>
          </div>

          <div className="absolute lg:left-[260px] lg:top-[300px] grid sm:grid-cols-1 lg:grid-cols-2 gap-4 items-end justify-center w-full profile_sec_mob lg:w-[623px]">
            <h1 className="text-white text-[20px] sm:text-[18px] lg:text-[24px] mt-6 font-bold mx-11">
              {profileData?.name || "User Name"}
            </h1>
            <button
              className="bg-[#199BD1] w-[100px] mx-64 sm:w-[107px] h-[32px] text-white text-[10px] sm:text-[11px] font-[700] px-4 py-1 rounded-[10px]"
              onClick={() => navigation("/editprofile")}
            >
              Edit Profile
            </button>
          </div>
        </div>

        <div className="grid bg-[#1A293D] p-8 w-full gap-5 lg:grid-cols-2 sm:grid-cols-1 mt-16">
          <div className="mt-11">
            <AuthInput2
              text="Email"
              placeholder="mark@gmail.com"
              type="email"
              state={profileData?.email}
              disabled
            />
          </div>
          <div className="mt-11">
            <AuthInput2
              text="Name"
              placeholder="Dock manager"
              type="text"
              state={profileData?.name}
              disabled
            />
          </div>
          <div className="mt-5">
            <AuthInput2
              text="Password"
              placeholder="Password"
              type="password"
              state={profileData?.password}
              disabled
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
