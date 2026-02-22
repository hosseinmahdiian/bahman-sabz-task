"use client";
import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import FilterItem from "./filterItem";

const Filter = ({
  items = [],
  title = "test",
  FN,
}: {
  items?: { name: string; id: number }[];
  title?: string;
  FN?: Dispatch<SetStateAction<boolean>>;
  open?: boolean;
  icon?: ReactNode;
}) => {
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  const [modal, setModal] = useState(false);
  const startY = useRef<number | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onPointerDown = (e: React.PointerEvent) => {
    startY.current = e.clientY;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (startY.current === null) return;

    const delta = startY.current - e.clientY;

    if (delta > 20) {
      setFull(true);
    } else if (delta < -20) {
      setFull(false);
      setOpen(false);
    }

    startY.current = null;
  };

  return (
    <>
      <div className="relative h-full ">
        <div className="lg:border-t border-theme w-fit border b rounded-2xl text-theme text-theme relative">
          <p className="bg-theme px-4 py-2 lg:absolute top-0 right-4 ">{title}</p>
        </div>

        <div
          className={`fixed !px-0 lg:hidden inset-x-0 -bottom-20 z-[39] bg-theme 
        transition-transform duration-500 ease-out mb-16 md:mb-20 overflow-auto   
        ${open ? "translate-y-0" : "translate-y-full"}
        ${
          full
            ? "h-[calc(100%-80px)] rounded"
            : "h-[calc(60vh-80px)] rounded-t-xl "
        }`}
        >
          <div
            onPointerDown={onPointerDown}
            onPointerUp={onPointerUp}
            onClick={() => {
              setOpen(false);
              setFull(false);
            }}
            className="pt-3 sticky w-full top-0 pb-2 cursor-grab active:cursor-grabbing border-b border-theme bg-gray-100 dark:bg-gray-800 bg-theme z-20 "
          >
            <div className="w-12 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto my-2" />
          </div>

          <div className={`   overflow-y-auto pt-2  !overflow-scroll `}>
            {items?.length &&
              items?.map((item) => <FilterItem item={item} key={item?.id} />)}
          </div>
        </div>
      </div>
    </>
  );
};

export default Filter;
