import { ReactNode } from "react";

export type childrenType = Readonly<{
  children?: ReactNode;
}>;

export type OrderFields = "title" | "price" | "rating" | "category";
export type SortOrder = "asc" | "desc";
