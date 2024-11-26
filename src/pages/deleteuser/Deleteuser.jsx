import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import OwnerDelete from "../../components/deleteusers/OwnerDelete";
import SingleUserDelete from "../../components/deleteusers/SingleUserDelete";
import Pagination from "../../components/paginations/Pagination";
import SearchInput from "../../components/inputs/SearchInput";

const Deleteuser = () => {
  const [tabs, setTabs] = useState("1");
  const [pageDetails, setPageDetails] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [tabs]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
 
  };
  return (
    <div>
      <div className="p-5 bg-[#001229] rounded-[20px] h-[944px] overflow-y-auto scrollbar-thin">
        <div className="">
          <div className="flex justify-between mb-4">
            <div>
              <h3 className="text-[18px] font-[700] mb-3 text-white">
                Deleted Users
              </h3>
              <div>
                <SearchInput
                  placeholder="Search by name or email"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
              <div className="flex gap-3 items-center">
                <button
                  className={`w-[51px] h-[27px] mt-3 text-[11px] rounded-[100px] ${
                    tabs === "1"
                      ? "bg-[#199BD1] text-white"
                      : "bg-[#199BD126] text-[#199BD1]"
                  }`}
                  onClick={() => setTabs("1")}
                >
                  Owners
                </button>
                <button
                  className={`w-[72px] h-[27px] mt-3 text-[11px] rounded-[100px] ${
                    tabs === "2"
                      ? "bg-[#199BD1] text-white"
                      : "bg-[#199BD126] text-[#199BD1]"
                  }`}
                  onClick={() => setTabs("2")}
                >
                  Single Users
                </button>
              </div>
            </div>
          </div>
        </div>
        {tabs === "1" && (
          <OwnerDelete
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            setPageDetails={setPageDetails}
            searchValue={searchValue}
          />
        )}
        {tabs === "2" && (
          <SingleUserDelete
            currentPage={currentPage}
            setTotalPages={setTotalPages}
            setPageDetails={setPageDetails}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        setTotalPages={setTotalPages}
      />
    </div>
  );
};

export default Deleteuser;
