import React from "react";
import { Link } from "react-router-dom";

const SingleUserDelete = () => {
  return (
    <div className="w-full  rounded-lg overflow-hidden">
    <div className="grid grid-cols-[2fr_2fr_2fr_1.5fr_1.5fr_1fr_0.5fr] gap-4  p-4 text-[#FFFFFF80] text-[12px] font-semibold">
      {[
        "Single User Name",
        "Email",
        "Phone Number",
        "Onboarding Date",
        "Removal Date",
        "Status",
        "Actions",
      ]?.map((item, index) => (
        <div key={index} className="text-[11px] font-[500]">
          {item}
        </div>
      ))}
    </div>
    {Array.from({ length: 13 })?.map((_, index) => (
      <div
        key={index}
        className="grid grid-cols-[2fr_2fr_2fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-4 text-white text-[12px] border-b border-[#FFFFFF24]"
      >
        {[
          "Owner ABC",
          "ethanliam@gmail.com",
          "+1 000 000 0000",
          "12/12/2024",
          "12/12/2024",
        ]?.map((item, index) => (
          <div key={index} className="text-[11px] font-[500]">
            {item}
          </div>
        ))}

        <div>
          <button className="px-3 py-1 w-[67px] h-[23px] rounded-full bg-[#9A9A9A] text-[11px]">
            Removed
          </button>
        </div>
        <div className="">
          <Link
            to={"/deletesingleuser"}
            className="underline text-white hover:text-white text-[11px]  text-nowrap font-[500]"
          >
            View Details
          </Link>
        </div>
      </div>
    ))}
  </div>
  );
};

export default SingleUserDelete;
