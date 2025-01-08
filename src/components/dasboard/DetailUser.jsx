import React, { useEffect, useState } from "react";
import { Singleuserprofile } from "../../assets/export";
import AuthInput from "../onboarding/AuthInput";
import { useNavigate, useParams } from "react-router-dom";
import { ErrorToast } from "../Toaster/Toaster";
import axios from "../../axios";
import Skeleton from "../global/Skeleton";

const DetailUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [userDetail, setUserDetail] = useState();
  const [loading, setLoading] = useState(false);

  const getDashboardData = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(`/admin/customer/${id}`);

      if (data?.success) {
        setUserDetail(data?.data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      ErrorToast(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getDashboardData();
  }, []);
  return (
    <div>
      <div className="flex flex-wrap lg:justify-start gap-3"></div>

      <div className="card bg-[#001229] p-10 rounded-[16px] mt-4  ">
        <div className="flex items-center mx-5 gap-4">
          <img
            src={
              userDetail?.customer?.profilePicture || "https://placehold.co/400"
            }
            className="w-[80px] rounded-full h-[80px]"
            alt=""
          />
          <div className="text-[24px] font-[700]">
            {userDetail?.customer?.name}
          </div>
        </div>
        <div className="grid gap-5 lg:grid-cols-2 sm:grid-cols-1 mt-5">
          {loading ? (
            <>
              {[...Array(6)].map((_, index) => (
                <div key={index} className="mt-4">
                  <div className="h-10 bg-gray-600 rounded"></div>
                </div>
              ))}
            </>
          ) : (
            <>
              <div className="mt-4">
                <AuthInput
                  text="Name"
                  placeholder="Mark Taylor"
                  type="text"
                  value={userDetail?.customer?.name || "Not Found"}
                  isDisabled={true}
                />
              </div>

              <div className="mt-4">
                <AuthInput
                  text="Email"
                  placeholder="mark@gmail.com"
                  type="email"
                  value={userDetail?.customer?.email || "Not Found"}
                  isDisabled={true}
                />
              </div>

              <div className="mt-4">
                <AuthInput
                  text="Phone Number"
                  placeholder="000 0000 0000"
                  type="text"
                  value={userDetail?.customer?.phoneNumber || "Not Found"}
                  isDisabled={true}
                />
              </div>

              <div className="mt-4">
                <AuthInput
                  text="Onboarding Date"
                  type="text"
                  value={
                    userDetail?.customer?.createdAt
                      ? new Date(
                          userDetail.customer.createdAt
                        ).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        })
                      : "Not Found"
                  }
                  isDisabled={true}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className=" mt-3 gap-3">
        <div className="">
          <div className="card bg-[#001229]  h-[346px] overflow-y-auto   p-5 col-span-3 rounded-[20px]">
            <div className="flex justify-between">
              <h3 className="text-[18px] font-[700]">Subscription History</h3>
            </div>
            <div className="grid gap-4">
              <div className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 p-4  text-[#FFFFFF80] border-b-2 border-[#FFFFFF24] text-[11px] font-semibold rounded-t-lg">
                <div>Date</div>
                <div>Subscription Plan</div>
                <div>Subscription Fee</div>
                <div>Revenue</div>
              </div>
              {loading ? (
                <Skeleton />
              ) : userDetail?.userSubscription?.length === 0 ? (
                <div className="text-center h-10 font-bold">Data Not Found</div>
              ) : (
                userDetail?.userSubscription?.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-[2fr_2fr_1fr_1fr] gap-4 p-3 text-[11px] border-[#FFFFFF24] border-b-2  text-white "
                  >
                    <div>
                      {" "}
                      {new Date(item?.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      })}
                    </div>
                    <div>{item?.subscriptionPlan?.name || "N/A"}</div>
                    <div>{item?.price || "N/A"}</div>
                    <div>{item?.price || "N/A"}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          className="bg-[#199BD1] w-[235px]  h-[54px] rounded-[8px] text-white"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default DetailUser;
