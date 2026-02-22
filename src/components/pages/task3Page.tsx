"use client";
import AdvancedSelectVirtualized from "@/templates/dropDown";
// import DropDown from "@/templates/dropDownComponent/dropDown";
import LayoutTask3 from "../layouts/task3/layout";
import { useState } from "react";
import { groups } from "@/constants";

const Task3Page = () => {
  return (
    <LayoutTask3>
      <div className="mx-auto w-fit mt-40">
        <AdvancedSelectVirtualized groups={groups} />
      </div>
    </LayoutTask3>
  );
};

export default Task3Page;
