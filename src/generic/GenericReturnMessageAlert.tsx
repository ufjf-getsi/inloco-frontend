import { Alert, AlertProps } from "@cloudscape-design/components";
import { toUpperCase } from "./GenericFunctions";
import { GenericRecordProps, PageType } from "./GenericInterfaces";

export interface GenericReturnMessageAlertProps extends GenericRecordProps {
  alertVisible: boolean;
  setAlertVisible: Function;
  alertType: AlertProps.Type;
  pageType: PageType;
}

export default function GenericReturnMessageAlert(
  props: GenericReturnMessageAlertProps
) {
  const recordGenderArticle = props.recordGenderFeminine ? "a" : "o";
  const edit = props.pageType === "edit";

  let alertText = "";

  if (props.alertType === "success") {
    if (props.pageType === "reorder") {
      alertText = `${toUpperCase(recordGenderArticle)}s ${
        props.recordCategoryPlural
      } foram reornedad${recordGenderArticle}s com sucesso!`;
    } else {
      alertText = `${toUpperCase(recordGenderArticle)} ${
        props.recordCategorySingular
      } foi ${edit ? "editad" : "criad"}${recordGenderArticle} com sucesso!`;
    }
  } else if (props.alertType === "error") {
    if (props.pageType === "reorder") {
      alertText = `${toUpperCase(recordGenderArticle)}s ${
        props.recordCategoryPlural
      } não puderam ser reornedad${recordGenderArticle}s! Tente novamente.`;
    } else {
      alertText = `Não foi possível ${
        edit ? "editar" : "criar"
      } ${recordGenderArticle} ${
        props.recordCategorySingular
      }! Tente novamente.`;
    }
  } else if (props.alertType === "warning")
    alertText = `Não foi possível ${
      edit ? "editar" : "criar"
    } ${recordGenderArticle} ${
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
