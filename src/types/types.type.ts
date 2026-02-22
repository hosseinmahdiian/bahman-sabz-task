import { ReactNode } from "react";

export type childrenType = Readonly<{
  children?: ReactNode;
}>;

export type OrderFieldsType = "title" | "price" | "rating" | "category";
export type SortOrderType = "asc" | "desc";

export type OrderingType =
  | "name"
  | "released"
  | "added"
  | "created"
  | "updated"
  | "rating"
  | "metacritic"
  | "";
