import { Alert, AlertProps } from "@cloudscape-design/components";
import { toUpperCase } from "./GenericFunctions";

export interface GenericReturnMessageAlertProps {
  alertVisible: boolean;
  setAlertVisible: Function;
  alertType: AlertProps.Type;
  recordCategorySingular: string;
  edit: boolean;
  recordGenderArticle: string;
}

export default function GenericReturnMessageAlert(
  props: GenericReturnMessageAlertProps
) {
  let alertText = "";
  if (props.alertType === "success")
    alertText = `${toUpperCase(props.recordGenderArticle)} ${
      props.recordCategorySingular
    } foi ${props.edit ? "editad" : "criad"}${
      props.recordGenderArticle
    } com sucesso!`;
  else if (props.alertType === "error")
    alertText = `Não foi possível ${props.edit ? "editar" : "criar"} ${
      props.recordGenderArticle
    } ${props.recordCategorySingular}! Tente novamente.`;
  else if (props.alertType === "warning")
    alertText = `Não foi possível ${props.edit ? "editar" : "criar"} ${
      props.recordGenderArticle
    } ${
      props.recordCategorySingular
    }! Os dados foram preenchidos incorretamente.`;

  if (props.alertVisible) {
    return (
      <Alert
        onDismiss={() => props.setAlertVisible(false)}
        dismissAriaLabel="Fechar alerta"
        dismissible
        type={props.alertType}
        className="absolute right-0 w-fit mt-8 mr-8"
      >
        {alertText}
      </Alert>
    );
  } else return null;
}
