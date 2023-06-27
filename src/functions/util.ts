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
    return parseInt(string);
  } catch (error) {
    return 0;
  }
}

export function toUpperCase(text: String) {
  return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

export function formatDate(date: Date) {
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" });
  const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
    timeStyle: "short",
    hour12: false,
  });
  return `${dateFormatter.format(date)}, ${timeFormatter.format(date)}`;
}
