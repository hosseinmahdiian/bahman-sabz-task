import { Dispatch, SetStateAction } from "react";

export const sp = (number: number | string) => {
  const Number = number?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return Number;
};

export const convertPersianToEnglish = (str: string) => {
  if (!str) return "";
  const persian = [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g];
  const english = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  for (let i = 0; i < 10; i++) {
    str = str.replace(persian[i], english[i]);
  }
  return str;
};




export const handleChange = <T extends object>(
  e: React.ChangeEvent<HTMLInputElement>,
  set: Dispatch<SetStateAction<T>>,
) => {
  const { name, value } = e.target;
  set((prev) => ({ ...prev, [name]: value.trim() }));
};


