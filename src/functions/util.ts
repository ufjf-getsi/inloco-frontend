import { PageType, OptionStringString as Option } from "../clientTypes";

export function searchLabelByValue(
  optionsList: Option[],
  searchedValue: string
): string {
  return (
    optionsList.find((option) => {
      return option.value === searchedValue;
    })?.label ?? searchedValue
  );
}

export function localizedPageTypeName(pageType: PageType) {
  switch (pageType) {
    case "list":
      return "Lista de";
    case "view":
      return "Visualizar";
    case "create":
      return "Criar";
    case "edit":
      return "Editar";
    case "reorder":
      return "Reordenar";
  }
}

export function convertStringToInteger(string: string): number {
  try {
    const result = parseInt(string);
    if (isNaN(result)) return 0;
    else return result;
  } catch (error) {
    return 0;
  }
}

export function toUpperCase(text: String) {
  return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

interface FormatDateOptions {
  type?: "full" | "date" | "time";
}
export function formatDate(date: Date, options?: FormatDateOptions): string {
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "medium",
  });
  const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeStyle: "short",
    hour12: false,
  });
  if (options && options.type === "date") return dateFormatter.format(date);
  else if (options && options.type === "time")
    return timeFormatter.format(date);
  else return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
}
