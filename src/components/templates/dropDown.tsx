"use client";

import { Fragment, useMemo, useState } from "react";
import { GroupedVirtuoso } from "react-virtuoso";

import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Transition,
} from "@headlessui/react";
import Input from "./input";

export type SelectGroup = {
  label: string;
  items: string[];
};

type AdvancedSelectProps = {
  groups: SelectGroup[];
};

export default function AdvancedSelectVirtualized({
  groups,
}: AdvancedSelectProps) {
  const [selected, setSelected] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const searchItem = useMemo(() => {
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) =>
          item.toLowerCase().includes(search.toLowerCase()),
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, search]);

  const groupCounts = searchItem.map((g) => g.items.length);
  const groupLabels = searchItem.map((g) => g.label);
  
  const allItems = useMemo(() => {
    return searchItem.flatMap((g) => g.items);
  }, [searchItem]);

  const toggleAll = () => {
    if (selected.length === allItems.length) setSelected([]);
    else setSelected(allItems);
  };

  const isSelected = (item: string) => selected.includes(item);


  return (
    <div className="w-72 ">
      <Listbox value={selected} onChange={setSelected} multiple>
        <div className="relative mt-1">
          <ListboxButton className="relative w-full cursor-pointer rounded-lg bg-white dark:bg-gray-700 py-2 pl-3 pr-3  shadow-md border  border-theme text-size !text-gray-600 dark:!text-gray-200 outline-0 ">
            <span className=" text-right line-clamp-1 ">
              {selected.length === 0
                ? "انتخاب کنید..."
                : `${selected.length} مورد انتخاب شده`}
            </span>
          </ListboxButton>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-200 "
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <ListboxOptions className="absolute shadow-lg  dark:shadow-gray-700 mt-1 w-full rounded-md bg-theme  border border-theme z-50 text-size text-theme max-h-fit overflow-auto outline-0">
              <div className="px-2 my-3 pb-1 ">
                <Input
                  type="text"
                  placeholder="جستجو..."
                  data={search}
                  FN={(e) => setSearch(e.target.value)}
                />
              </div>

              <div className="px-2 py-1 flex justify-between text-size text-theme border-b border-theme">
                <button
                  type="button"
                  onClick={toggleAll}
                  className="text-blue-600"
                >
                  {selected.length === allItems.length && allItems.length > 0
                    ? "لغو انتخاب همه"
                    : "انتخاب همه"}
                </button>
                <span className=" text-l-theme">{allItems.length} مورد</span>
              </div>

              {/* {searchItem.map((group) => (
                <div key={group.label}>
                  <div className="px-3 py-1 text-size  font-bold !text-gray-600 dark:!text-gray-200  bg-gray-100 dark:bg-gray-700 line-clamp-1">
                    {group.label}
                  </div>

                  {group.items.map((item) => (
                    <ListboxOption
                      key={item}
                      value={item}
                      className={({ active }) =>
                        `cursor-pointer select-none py-2 pl-3 pr-3 animation-theme ${
                          active ? "bg-blue-100 dark:bg-blue-700 " : ""
                        }`
                      }
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          readOnly
                          checked={isSelected(item)}
                          className="h-3 w-3"
                        />
                        <span
                          className={`line-clamp-1 ${
                            isSelected(item) ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>
                      </div>
                    </ListboxOption>
                  ))}
                </div>
              ))} */}

              <GroupedVirtuoso
                style={{ height: 250 }}
                groupCounts={groupCounts}
                groupContent={(index) => (
                  <div className="px-3 py-1 text-size font-bold bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
                    {groupLabels[index]}
                  </div>
                )}
                itemContent={(index) => {
                  const item = allItems[index];
                  return (
                    <ListboxOption
                      key={item}
                      value={item}
                      className={({ active }) =>
                        `cursor-pointer select-none py-2 pl-3 pr-3 ${
                          active ? "bg-blue-100 dark:bg-blue-700" : ""
                        }`
                      }
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          readOnly
                          checked={isSelected(item)}
                          className="h-3 w-3"
                        />
                        <span
                          className={
                            isSelected(item) ? "font-medium" : "font-normal"
                          }
                        >
                          {item}
                        </span>
                      </div>
                    </ListboxOption>
                  );
                }}
              />
            </ListboxOptions>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}
