import React, { useState } from "react";
import AuthInput from "../onboarding/AuthInput";
import { Link } from "react-router-dom";
import AuthInput2 from "../onboarding/AuthInput2";
import GenerateCrediantial from "../Modal/GenerateCrediantial";

const OwnerDetail = () => {
  const [tab, setTab] = useState("1");
  const [generateOpen, setGenerateOpen] = useState(false);
  return (
    <div>
      {tab === "1" && (
        <>
          <div className="bg-[#001229] h-[382px] rounded-[18px] ">
            <h2 className="text-[18px] font-[700] p-4 ">Owner Details</h2>
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
                    text={"Email"}
                    placeholder={"mark@gmail.com"}
                    type={"text"}
                  />
                </div>
                <div className="mt-3">
                  <AuthInput
                    text={"Job Title"}
                    placeholder={"Dock manager"}
                    type={"text"}
                  />
                </div>
              </div>
              <div className="col-span-6">
                <div className="mt-3">
                  <AuthInput
                    text={"Location"}
                    placeholder={"East California dock"}
                    type={"text"}
                  />
                </div>
                <div className="mt-3">
                  <AuthInput
                    text={"Phone Number"}
                    placeholder={"000 0000 0000"}
                    type={"text"}
                  />
                </div>
                <div className="mt-3">
                  <AuthInput text={"Onboarding Date"} type={"date"} />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-3 flex-wrap">
            <Link to={"/settings"} className="hover:no-underline">
              <div className="flex justify-end mt-4">
                <button className="bg-[#02203A] w-[235px]   h-[54px] rounded-[8px] text-[#199BD1] font-[700]">
                  Back
                </button>
              </div>
            </Link>
            <div className="flex justify-end mt-4">
              <button
                className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white"
                onClick={() => setTab("2")}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
      {tab === "2" && (
        <div>
          <div className="bg-[#001229] h-[594px] rounded-[18px] flex justify-center items-center">
            <div className="w-[536px] h-[565px] bg-[#1A293D] rounded-[18px] flex flex-col items-center justify-center">
              <div className="w-full px-12">
                <div className="text-start mb-6">
                  <div className="text-[20px] font-[700] text-white mb-2">
                    Preview Details
                  </div>
                  <div className="text-[#FFFFFF80] text-[13px]">
                    Please ensure the accuracy of the information provided.
                    Incorrect details may result in the employee not receiving
                    their credentials.
                  </div>
                </div>

                <div className="flex flex-col items-center">
                  <div className="w-full mb-5">
                    <AuthInput2
                      text={"Employee Name"}
                      type={"text"}
                      placeholder={"Mike Smith"}
                    />
                  </div>
                  <div className="w-full mb-5">
                    <AuthInput2 text={"Password"} type={"password"} />
                  </div>
                </div>
                <button
                  className="bg-[#199BD1] w-[436px] h-[50px] rounded-[8px] font-[700] text-[16px]"
                  onClick={() => setGenerateOpen(true)}
                >
                  Generate Credentials
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <button
              className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white"
              onClick={() => setTab("1")}
            >
              Back
            </button>
          </div>
        </div>
      )}
      <GenerateCrediantial
        isOpen={generateOpen}
        onClose={() => setGenerateOpen(false)}
      />
    </div>
  );
};

export default OwnerDetail;
