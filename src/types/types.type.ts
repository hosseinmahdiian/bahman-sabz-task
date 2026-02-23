import { ReactNode } from "react";

export type childrenType = Readonly<{
  children?: ReactNode;
}>;

export type OrderFieldsType = "title" | "price" | "rating" | "category";
export type SortOrderType = "asc" | "desc";

export type OrderingType =
  | "name"
  | "-name"
  | "released"
  | "added"
  | "created"
  | "updated"
  | "rating"
  | "-rating"
  | "metacritic"
  | "";

export type PropsPagesType = {
  searchParams?: { ordering?: string };
  params?: { id: string };
};
