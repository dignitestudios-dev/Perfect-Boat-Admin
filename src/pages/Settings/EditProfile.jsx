import React from "react";
import AuthInput from "../../components/onboarding/AuthInput";
import { Link, useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigation = useNavigate();
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
              />
            </div>
            <div className="mt-3">
              <AuthInput
                text={"User Name "}
                placeholder={"mark@gmail.com"}
                type={"text"}
              />
            </div>
          </div>
          <div className="col-span-6">
            <div className="mt-3">
              <AuthInput
                text={"Email"}
                placeholder={"mark@gmail.com"}
                type={"text"}
              />
            </div>
            <div className="mt-3">
              <AuthInput
                text={"Password"}
                placeholder={"000 0000 0000"}
                type={"password"}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-3 flex-wrap">
        <div className="flex justify-end mt-4">
          <button
            className="bg-[#02203A] w-[235px]   h-[54px] rounded-[8px] text-[#199BD1] font-[700]"
            onClick={() => navigation("/profile")}
          >
            Back
          </button>
        </div>

        <div className="flex justify-end mt-4">
          <button
            className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white"
            onClick={() => navigation("/profile")}
          >
            Save
          </button>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
