import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";
import Pagination from "../paginations/Pagination";

const OwnerDelete = ({
  currentPage,
  setTotalPages,
  setPageDetails,
  searchValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [deleteOwnerlist, setDeleteOwner] = useState([]);

  const deleteOwner = async () => {
    try {
      setLoading(true);
      let url = `/admin/user/deleted?isSingleUser=false&page=${currentPage}&pageSize=12`;

      if (searchValue) {
        url += `&search=${encodeURIComponent(searchValue)}`;
      }

      const { data } = await axios.get(url);

      setDeleteOwner(data?.data?.data);
      setPageDetails(data?.data?.paginationDetails || []);
      setTotalPages(data?.data?.paginationDetails?.totalPages);
    } catch (error) {
      console.error("Error fetching owner data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      deleteOwner();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, currentPage]);
  return (
    <>
      <div className="w-full rounded-lg overflow-hidden ">
        <div className="grid grid-cols-7 gap-4 p-4 bg-[#001229] text-[#FFFFFF80] text-[12px] font-semibold">
          {[
            "Owner Name",
            "Total No. of Users",
            "Email",
            "Phone Number",
            "Onboarding Date",
            "Removal Date",
            "Status",
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
          <div className="p-4 text-center text-white">No deleted users</div>
        ) : (
          deleteOwnerlist?.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-7 gap-4 p-4 text-[11px] border-b-2 border-[#FFFFFF24] text-white bg-[#001229] items-center"
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

              {/* <div>
                <Link
                  to={`/deleteownerdetail/${item._id}`}
                  className="underline text-white hover:text-[#FF5733] text-[11px] font-[500]"
                >
                  View Details
                </Link>
              </div> */}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OwnerDelete;
