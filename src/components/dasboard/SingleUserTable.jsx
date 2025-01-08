import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";
const SingleUserTable = () => {
  const [loading, setLoading] = useState(false);
  const [singleUserData, setSingleUserData] = useState([]);

  const getSingleUserTableData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "/admin/customer?isSingleUser=true&page=1&pageSize=6"
      );

      setSingleUserData(data?.data?.data);
      console.log(
        singleUserData,
        "singleUserDatasingleUserDatasingleUserDatasingleUserData"
      );
    } catch (error) {
      console.error("Error fetching owner data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleUserTableData();
  }, []);

  return (
    <div className="">
      <div className="card bg-[#001229] p-5 col-span-3 rounded-[20px]">
        <div className="flex justify-between">
          <h3 className="text-[14px]">
            Single Users  ({singleUserData?.length})
          </h3>

          <Link
            to={"/singleuser"}
            className="text-[#199BD1] underline text-[12px]"
          >
            View all
          </Link>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
            <div>Name</div>
            <div className="">Onboarding Date</div>
            <div className="text-end mx-4">Actions</div>
          </div>
          {loading ? (
            <div>
              <Skeleton />
            </div>
          ) : singleUserData?.length === 0 ? (
            <p>No data available.</p>
          ) : (
            singleUserData?.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
              >
                <div className="font-medium">{item?.name}</div>
                <div className="">
                  {new Date(item?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </div>
                <Link
                  to={`/detailuser/${item?._id}`}
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

export default SingleUserTable;
