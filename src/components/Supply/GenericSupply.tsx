import { useHref, useParams } from "react-router-dom";
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
import GenericBreadcrumbGroup from "../Generic/GerenicBreadcrumbGroup";

export interface Fields {
  name: string;
  quantity: string;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
}

type ImplementedRecordFormProps = GenericRecordFormProps &
  FormFieldsProps & {
    cancelRedirectLink: string;
  };

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
      href: useHref(`/supplies`),
    },
  ];
  if (pageType !== "list") {
    if (pageType === "edit") {
      breadcrumbsItemsList.push({
        text: `Suprimento`,
        href: useHref(`/supplies/${id}`),
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
  if (inputValues.name && inputValues.quantity) {
    return true;
  } else return false;
}

export function getSendableData(inputValues: Fields): Supply {
  return {
    id: "",
    name: inputValues.name,
    quantity: inputValues.quantity,
  };
}

export function RecordForm(props: ImplementedRecordFormProps) {
  const commonAttributes: any = {
    recordCategorySingular: `suprimento`,
    recordCategoryPlural: `suprimentos`,
    recordGenderFeminine: false,
    description: `Um suprimento é um item utilizado para medições em experimentos e coletas de dados.`,
    navbarActiveLink: `/supplies`,
    breadcrumbs: (
      <GenericBreadcrumbGroup
        items={breadcrumpGroupItems({
          pageType: props.edit ? "edit" : "create",
        })}
        expandAriaLabel="Mostrar caminho"
        ariaLabel="Breadcrumbs"
      />
    ),
    cancelRedirectLink: props.cancelRedirectLink,
    handleSubmit: props.handleSubmit,
    alertVisible: props.alertVisible,
    setAlertVisible: props.setAlertVisible,
    alertType: props.alertType,
  };
  if (props.edit) {
    commonAttributes.edit = true;
    commonAttributes.fetchRecordLink = props.fetchRecordLink;
    commonAttributes.setRecord = props.setRecord;
  } else {
    commonAttributes.edit = false;
    if (props.hasParent) {
      commonAttributes.hasParent = true;
      commonAttributes.fetchRecordLink = props.fetchRecordLink;
      commonAttributes.setRecord = props.setRecord;
    }
  }
  return (
    <GenericCreateAndEditPage {...commonAttributes}></GenericCreateAndEditPage>
  );
}

function FormFields({ inputValues, setInputValues }: FormFieldsProps) {
  return (
    <SpaceBetween size="l">
      <FormField label="Suprimento">
        <Input
          value={inputValues.name}
          placeholder={`Nome do suprimento`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              name: event.detail.value,
            }))
          }
        />
      </FormField>
      <FormField label="Quantidade">
        <Input
          value={inputValues.quantity}
          placeholder={`Quantidade do suprimento`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              quantity: event.detail.value,
            }))
          }
        />
      </FormField>
    </SpaceBetween>
  );
}
