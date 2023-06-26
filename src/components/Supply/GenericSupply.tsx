import { useHref, useParams } from "react-router-dom";
import { Supply } from "../../types";

import { SpaceBetween, FormField, Input } from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../../generic/GenericPages/GenericCreateAndEditPage";
import {
  convertStringToInteger,
  localizedPageTypeName,
} from "../../generic/GenericFunctions";
import { PageType } from "../../generic/GenericInterfaces";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

export interface Fields {
  name: string;
  stock: string;
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
  stock: "0",
};

export const notLoadedRecord: Supply = {
  id: "",
  name: "Carregando...",
  stock: 0,
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
      text: `${localizedPageTypeName(pageType)} suprimentos`,
      href: "#",
    });
  }
  return breadcrumbsItemsList;
};

export function validateFields(inputValues: Fields): boolean {
  try {
    const validName = inputValues.name ? inputValues.name !== "" : false;
    const validStock = inputValues.stock
      ? inputValues.stock !== "" && Number.parseInt(inputValues.stock) >= 0
      : false;
    return validName && validStock;
  } catch (error) {
    return false;
  }
}

export function formattedFields(record: Supply): Fields {
  return {
    name: record.name,
    stock: record.stock.toString(),
  };
}

export function getSendableData(inputValues: Fields): Supply {
  return {
    id: "",
    name: inputValues.name,
    stock: convertStringToInteger(inputValues.stock),
  };
}

export function RecordForm(props: ImplementedRecordFormProps) {
  const commonAttributes: any = {
    recordCategorySingular: `equipamento`,
    recordCategoryPlural: `equipamentos`,
    recordGenderFeminine: false,
    description: `Equipamentos disponíveis para as aferições no campo.`,
    navbarActiveLink: `/equipment`,
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
    <GenericCreateAndEditPage {...commonAttributes}>
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
      {/* // TODO: prevent non numerical input */}
      <FormField label="Estoque">
        <Input
          value={inputValues.stock}
          type="number"
          inputMode="numeric"
          step={1}
          placeholder={`Quantidade no estoque`}
          onChange={(event) => {
            setInputValues((prevState: Fields) => ({
              ...prevState,
              stock: event.detail.value,
            }));
          }}
        />
      </FormField>
    </SpaceBetween>
  );
}
