import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";

const OwnerDelete = () => {
  const [loading, setLoading] = useState(false);
  const [deleteOwnerlist, setDeleteOwner] = useState([]);

  const deleteOwner = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "/admin/user/deleted?isSingleUser=false"
      );
      setDeleteOwner(data?.data);
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
    deleteOwner();
  }, []);
  return (
    <div className="w-full rounded-lg overflow-hidden bg-[#0A192F]">
      <div className="grid grid-cols-8 gap-4 p-4 bg-[#001229] text-[#FFFFFF80] text-[12px] font-semibold">
        {[
          "Owner Name",
          "Total No. of Users",
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
        <div className="p-4">
          <Skeleton />
        </div>
      ) : deleteOwnerlist?.length === 0 ? (
        <div className="p-4 text-center text-white">No data available</div>
      ) : (
        deleteOwnerlist?.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-8 gap-4 p-4 text-[11px] border-b-2 border-[#FFFFFF24] text-white bg-[#001229] items-center"
          >
            <div>{item?.name || "N/A"}</div>

            <div>{item?.totalUser || "N/A"}</div>

            <div>{item?.email || "N/A"}</div>

            <div>{item?.phoneNumber || "N/A"}</div>

            <div>
              {new Date(item?.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>

            <div>
              {new Date(item?.updatedAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}
            </div>

            <div>
              <button className="px-3 py-1 rounded-full bg-[#9A9A9A] text-[11px]">
                Removed
              </button>
            </div>

            <div>
              <Link
                to="/deletesingleuser"
                className="underline text-white hover:text-[#FF5733] text-[11px] font-[500]"
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

export default OwnerDelete;
