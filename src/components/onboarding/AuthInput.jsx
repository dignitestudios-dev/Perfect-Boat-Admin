import React, { useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const AuthInput = ({
  register,
  text,
  type,
  error,
  placeholder,
  value,
  isDisabled = false,
  isAuth = true,
  maxLength,
}) => {
  const [isPassVisible, setIsPassVisible] = useState(false);

  return (
    <div className="w-full h-auto flex   flex-col gap-1 justify-start items-start  ">
      <label className="ml-1 text-sm font-medium text-[#fff] capitalize">
        {text}
      </label>
      <div
        className={`w-full h-[52px] lg:w-[434px] focus-within:border-[1px] focus-within:border-[#55C9FA] rounded-[12px] bg-[#1A293D] flex items-center justify-start  ${
          error
            ? "focus-within:border-[#FF453A]"
            : "focus-within:border-[#55C9FA]"
        } `}
      >
        <div
          className={` w-full  h-full flex items-center justify-center    rounded-[12px] relative`}
        >
          <input
            value={value}
            type={isPassVisible ? "text" : type}
            disabled={isDisabled}
            maxLength={maxLength}
            placeholder={placeholder}
            className={`w-full outline-none rounded-[12px] placeholder:text-[13px] placeholder:font-normal
             placeholder:text-[#6B737E] text-white ${
               isAuth ? "bg-transparent" : "bg-[#001229]"
             }  h-full px-3 text-sm font-medium `}
            {...register}
          />
          <button
            type="button"
            onClick={() => setIsPassVisible((prev) => !prev)}
            className="absolute top-4 text-lg right-2"
            style={{
              color: "#6B7373",
            }}
          >
            {type == "password" &&
              (!isPassVisible ? <BsEye /> : <BsEyeSlash />)}
          </button>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
};

export default AuthInput;
