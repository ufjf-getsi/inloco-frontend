import { Supply } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  BreadcrumbGroup,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";
import { localizedPageTypeName } from "../Generic/GenericFunctions";
import { PageType } from "../Generic/GenericInterfaces";
import { useParams } from "react-router-dom";

export interface Fields {
  name: string;
  quantity: string;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
}

interface ImplementedRecordFormProps
  extends GenericRecordFormProps,
    FormFieldsProps {
  cancelRedirectLink: string;
}

export const emptyFields: Fields = {
  name: "",
  quantity: "",
};

export const notLoadedRecord: Supply = {
  id: "",
  name: "Carregando...",
  quantity: "",
};

interface BreadcrumbGroupItemsProps {
  pageType: PageType;
}
export const breadcrumpGroupItems = ({
  pageType,
}: BreadcrumbGroupItemsProps) => {
  const { id } = useParams();
  const breadcrumbsItemsList = [
    {
      text: "Suprimentos",
      href: `${import.meta.env.VITE_BASE_URL_HASH}supplies`,
    },
  ];
  if (pageType !== "list") {
    if (pageType === "edit") {
      breadcrumbsItemsList.push({
        text: `Suprimento`,
        href: `${import.meta.env.VITE_BASE_URL_HASH}supplies/${id}`,
      });
    }
    breadcrumbsItemsList.push({
      text: `${localizedPageTypeName(pageType)} suprimento`,
      href: "#",
    });
  }
  return breadcrumbsItemsList;
};

export function validateFields(inputValues: Fields): boolean {
  if (inputValues.name) {
    return true;
  } else return false;
}

export function RecordForm(props: ImplementedRecordFormProps) {
  return (
    <GenericCreateAndEditPage
      edit={props.edit}
      recordCategorySingular={`suprimento`}
      recordCategoryPlural={`suprimentos`}
      recordGenderFeminine={false}
      description={`Um suprimento é um item utilizado para medições em experimentos e coletas de dados.`}
      navbarActiveLink={`/supplies`}
      breadcrumbs={
        <BreadcrumbGroup
          items={breadcrumpGroupItems({
            pageType: props.edit ? "edit" : "create",
          })}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
      cancelRedirectLink={props.cancelRedirectLink}
      handleSubmit={props.handleSubmit}
      alertVisible={props.alertVisible}
      setAlertVisible={props.setAlertVisible}
      alertType={props.alertType}
    >
      <FormFields
        inputValues={props.inputValues}
        setInputValues={props.setInputValues}
      />
    </GenericCreateAndEditPage>
  );
}

function FormFields({ inputValues, setInputValues }: FormFieldsProps) {
  return (
    <SpaceBetween size="l">
      <FormField label="Nome">
        <Input
          value={inputValues.name}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              title: event.detail.value,
            }))
          }
        />
      </FormField>
      <FormField label="Quantidade">
        <Input
          value={inputValues.quantity}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              description: event.detail.value,
            }))
          }
        />
      </FormField>
    </SpaceBetween>
  );
}
