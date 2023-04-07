import { NavigateFunction, useHref } from "react-router-dom";
import { PageType, OptionStringString as Option } from "./GenericInterfaces";

export function toUpperCase(text: String) {
  return text.charAt(0).toLocaleUpperCase() + text.slice(1);
}

interface cancelLoadAndRedirectBackwardsProps {
  navigate: NavigateFunction;
  error: any;
  previousPageLink?: string;
}
export function cancelLoadAndRedirectBackwards({
  navigate,
  error,
  previousPageLink,
}: cancelLoadAndRedirectBackwardsProps) {
  console.log(error);
  navigate(
    import.meta.env.VITE_BASE_URL_HASH.slice(0, -1) + previousPageLink ?? `/`
  );
}

export function handleErrorRedirect(navigate: NavigateFunction, error: any) {
  console.error(error);
  navigate(import.meta.env.BASE_URL.slice(0, -1) + "/404", { replace: true });
}

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
  }
}
