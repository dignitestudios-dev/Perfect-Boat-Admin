import React from "react";
import { Link } from "react-router-dom";

const SingleUserTable = () => {
  return (
    <div className="">
      <div className="card bg-[#001229] p-5 col-span-3 rounded-[20px]">
        <div className="flex justify-between">
          <h3 className="text-[14px]">
          Single Users <span className="text-[#FFFFFF80]">(120)</span>
          </h3>
          
          <Link to={"/singleuser"} className="text-[#199BD1] underline text-[12px]">View all</Link>
        </div>
        <div className="grid gap-4">
        
          <div className="grid grid-cols-4 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
            <div>Name</div>
            <div className="text-center">Num of Users</div>
            <div className="text-center">Onboarding Date</div>
            <div className="text-end">Actions</div>
          </div>
          {[1, 2, 3, 4,5,6].map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-4 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
            >
              <div className="font-medium">Single User 1</div>
              <div className="text-center">156</div>
              <div className="text-center">12/12/2024</div>
              <Link to={"/detailuser"} className="text-end underline  text-white hover:text-white ">View Details</Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleUserTable;
