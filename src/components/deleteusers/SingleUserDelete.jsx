import React, { useEffect, useState } from "react";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";

const SingleUserDelete = ({
  currentPage,
  setTotalPages,
  setPageDetails,
  searchValue,
}) => {
  const [loading, setLoading] = useState(false);
  const [singleUserData, setSingleUserData] = useState([]);

  const deleteSingleUser = async () => {
    try {
      setLoading(true);

      let url = `/admin/user/deleted?isSingleUser=true&page=${currentPage}&pageSize=12`;
      if (searchValue) {
        url += `&search=${encodeURIComponent(searchValue)}`;
      }

      const { data } = await axios.get(url);

      setSingleUserData(data?.data?.data || []);
      setPageDetails(data?.data?.paginationDetails || []);
      setTotalPages(data?.data?.paginationDetails?.totalPages || 1);
    } catch (error) {
      console.error("Error fetching single user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      deleteSingleUser();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchValue, currentPage]);

  return (
    <div className="w-full rounded-lg overflow-hidden">

      <div className="grid grid-cols-[2fr_2fr_2fr_1.5fr_1.5fr_1fr_0.5fr] gap-4 p-4 text-[#FFFFFF80] text-[12px] font-semibold">
        {[
          "Single User Name",
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
        <div>
          <Skeleton />
        </div>
      ) : singleUserData?.length === 0 ? (
        <div className="p-4 text-center text-white">No deleted users</div>
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
              {item?.createdAt
                ? new Date(item?.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "N/A"}
            </div>
            <div>
              {item?.updatedAt
                ? new Date(item?.updatedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })
                : "N/A"}
            </div>
            <div>
              <button className="px-3 py-1 w-[67px] h-[23px] rounded-full bg-[#9A9A9A] text-[11px]">
                Removed
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SingleUserDelete;
