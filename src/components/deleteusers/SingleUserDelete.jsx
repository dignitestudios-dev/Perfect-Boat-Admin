import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";
const SingleUserDelete = () => {
  const [loading, setLoading] = useState(false);
  const [singleUserData, setSingleUserData] = useState([]);

  const deleteSingleUser = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/admin/user/deleted?isSingleUser=true");
      setSingleUserData(data?.data);
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
    deleteSingleUser();
  }, []);
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

      {loading ? (
        <div>
          <Skeleton />
        </div>
      ) : singleUserData === 0 ? (
        <div>no data</div>
      ) : (
        singleUserData?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_2fr_2fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-3 text-[11px] border-b-2 border-[#FFFFFF24] text-white bg-[#001229]"
          >
            <div>{item?.name || "N/A"}</div>
            <div>{item?.email || "N/A"}</div>
            <div>{item?.phoneNumber || "N/A"}</div>
            <div>
              {" "}
              {new Date(item?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>
            <div>
              {" "}
              {new Date(item?.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>

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
        ))
      )}
    </div>
  );
};

export default SingleUserDelete;
