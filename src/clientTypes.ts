// Interfaces and Types used multiple times, but only on the Front-end should be on this file

import { DataType } from "./types";

export interface GenericRecordProps {
  recordName?: string;
  recordCategorySingular: string;
  recordCategoryPlural: string;
  recordGenderFeminine: boolean;
}

export interface OptionStringString {
  label: string;
  value: string;
}

export interface OptionStringDataType {
  label: string;
  value: DataType;
}

export type PageType = "list" | "view" | "create" | "edit" | "reorder";
