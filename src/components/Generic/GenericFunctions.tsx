import { NavigateFunction, useNavigate } from "react-router-dom";

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
