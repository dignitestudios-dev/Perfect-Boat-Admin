import React, { useContext, useEffect, useRef } from "react";

import { HiOutlineNewspaper } from "react-icons/hi2";
import { GlobalContext } from "../../contexts/GlobalContext";

const PublishModal = ({ isOpen, setIsOpen }) => {
  const { navigate } = useContext(GlobalContext);
  const modalRef = useRef();

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    setTimeout(() => {
      navigate("/blogs", "Blogs");
    }, 3000);
  }, []);

  return (
    <div
      onClick={handleClickOutside}
      className={`fixed top-0 left-0 w-screen h-screen transition-all duration-500 z-50 flex items-center justify-center ${
        isOpen ? "scale-100" : "scale-0"
      }`}
    >
      <div
        ref={modalRef}
        className="relative bg-[#02203A] w-[418px] h-[257px] flex flex-col gap-5 justify-start items-center p-8 shadow-lg rounded-lg    "
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 text-[#199BD1]  text-xl font-bold mb-8"
        >
          ✕
        </button>

        {/* Modal content */}
        <HiOutlineNewspaper className="mx-auto text-[#36B8F3] bg-[#1A293D] p-2 w-[64.17px] h-[64.17px] rounded-full" />
        <h1 className="text-[20px] font-bold mb-[-10px]">Blog Updated</h1>
        <div className="w-auto flex flex-col justify-center items-center gap-3">
          <div className="w-full h-auto flex flex-col justify-center items-center gap-1">
            <span className="text-[16px] leading-[21.6px] text-white font-normal text-center">
              Smooth sailing! Your changes have been successfully updated. Your
              refreshed blog is now ready to continue its voyage. Happy Writing.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublishModal;
