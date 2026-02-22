"use client";
import { ChangeEvent, useState, type FC } from "react";
import { FaStarOfLife } from "react-icons/fa6";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type InputProps = {
  FN?: (e: ChangeEvent<HTMLInputElement>) => void;
  data?: string;
  name?: string;
  type?: string;
  inputMode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search";
  title?: string;
  placeholder?: string;
  disabled?: boolean;
  style?: string;
  inputStyle?: string;
  alert?: string;
  Required?: boolean;
};

const Input: FC<InputProps> = ({
  FN = () => {},
  data = "",
  name = "",
  type = "text",
  inputMode = "text",
  title = "",
  placeholder = "",
  disabled = false,
  style = "",
  alert = "",
  Required = false,
  inputStyle = "",
}) => {
  return (
    <div
      className={` ${style}  relative mx-auto   w-full ${alert && "mb-13"} 
      ${title ? "mt-6 lg:mt-10" : "mt-2"}
      `}
    >
      <label
        htmlFor={name}
        className={`absolute start-1 -top-4 lg:-top-6 text-theme text-size font-bold !h-fit rounded-lg px-2 md:-top-8 text transition-all ease-linear flex items-center gap-1`}
      >
        {title}
        {Required && <span className="text-red-500 pt-2 scale-120">*</span>}
      </label>

      <input
        className={`${
          disabled
            ? "cursor-not-allowed bg-dashboard-theme text-l-theme"
            : " text-theme "
        }${title ? "mt-4" : ""}${inputStyle}
        rounded-lg border-theme bg-theme  px-4 hover:border-b-blue-500 hover:border-b-2 border-theme p-2 outline-none hover:bg-gray-200 focus:border-b-blue-500 focus:border-b-2 focus:bg-gray-200  focus:dark:bg-gray-700  focus:dark:text-white animation-theme  dark:text-white focus:dark:text-black peer h-13 w-full  border border-theme  bg-theme px-5 placeholder-gray-400  focus:placeholder-transparent  placeholder`}
        id={name}
        name={name}
        disabled={disabled}
        type={type}
        value={data}
        inputMode={inputMode}
        placeholder={placeholder}
        onChange={FN}
      />

      {alert && (
        <label
          htmlFor={name}
          className={`absolute start-1 -bottom-6 flex !h-fit items-center gap-2 text-sm text-red-400 transition-all ease-linear`}
        >
          <FaStarOfLife className="text-[10px]" />
          <p className="mt-0.5">{alert}</p>
        </label>
      )}
    </div>
  );
};
export default Input;
