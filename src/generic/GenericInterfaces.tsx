// Interfaces and Types used multiple times, but only on the Front-end should be on this file

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

export type PageType = "list" | "view" | "create" | "edit";
