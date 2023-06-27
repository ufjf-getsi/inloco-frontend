import { useHref, useParams } from "react-router-dom";

import { Equipment } from "../../types";
import { PageType } from "../../clientTypes";
import { localizedPageTypeName } from "../../functions/util";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../../generic/pages/GenericCreateAndEditPage";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";
import { SpaceBetween, FormField, Input } from "@cloudscape-design/components";

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
  const validName = inputValues.name ? inputValues.name !== "" : false;
  return validName;
}

export function formattedFields(record: Equipment): Fields {
  return {
    name: record.name,
  };
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
