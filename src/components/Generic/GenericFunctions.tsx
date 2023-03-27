import { NavigateFunction, useNavigate } from "react-router-dom";
import { PageType } from "./GenericInterfaces";

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
  navigate(previousPageLink ?? `/`);
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