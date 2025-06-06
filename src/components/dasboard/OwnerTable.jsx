import axios from "../../axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "../global/Skeleton";
import moment from "moment";

const OwnerTable = () => {
  const [loading, setLoading] = useState(false);
  const [ownerData, setOwnerData] = useState([]);

  const getOwnerTableData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/admin/customer?isSingleUser=false");

      setOwnerData(data?.data);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOwnerTableData();
  }, []);
  return (
    <div className="">
      <div className="card bg-[#001229] p-5 rounded-[20px]">
        <div className="flex justify-between">
          <h3 className="text-[14px]">Owners ({ownerData?.length})</h3>
          <Link
            to={"/ownerlist"}
            className="text-[#199BD1] underline text-[12px]"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-4 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
            <div>Name</div>
            <div>Num of Users</div>
            <div>Onboarding Date</div>
            <div className="text-end mx-4">Actions</div>
          </div>
          {loading ? (
            <div>
              <Skeleton />
            </div>
          ) : ownerData?.length === 0 ? (
            <p>No data available.</p>
          ) : (
            ownerData?.slice(0, 6)?.map((item, index) => (
              <div
                key={item?.id || index}
                className="grid grid-cols-4 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2 text-white"
              >
                <div className="font-medium">{item?.name || "N/A"}</div>
                <div className="">{item?.totalUser || 0}</div>
                <div className="">
                  {moment(item?.createdAt)?.format("MM-DD-YYYY")}
                </div>
                <Link
                  to={`/detailowner/${item?._id}`}
                  className="underline text-white hover:text-white text-end"
                >
                  View Details
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnerTable;
