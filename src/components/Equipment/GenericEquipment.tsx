import { useHref, useParams } from "react-router-dom";
import { Equipment } from "../../types";

import { SpaceBetween, FormField, Input } from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../../generic/GenericPages/GenericCreateAndEditPage";
import { localizedPageTypeName } from "../../generic/GenericFunctions";
import { PageType } from "../../generic/GenericInterfaces";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

export interface Fields {
  name: string;
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
};

export const notLoadedRecord: Equipment = {
  id: "",
  name: "Carregando...",
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
      text: "Equipamentos",
      href: useHref(`/equipment`),
    },
  ];
  if (pageType !== "list") {
    if (pageType === "edit") {
      breadcrumbsItemsList.push({
        text: `Equipamento`,
        href: useHref(`/equipment/${id}`),
      });
    }
    breadcrumbsItemsList.push({
      text: `${localizedPageTypeName(pageType)} equipamento`,
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

export function getSendableData(inputValues: Fields): Equipment {
  return {
    id: "",
    name: inputValues.name,
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
      <FormField label="Equipamento">
        <Input
          value={inputValues.name}
          placeholder={`Nome do equipamento`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              name: event.detail.value,
            }))
          }
        />
      </FormField>
    </SpaceBetween>
  );
}
