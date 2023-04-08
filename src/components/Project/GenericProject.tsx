import { useHref, useParams } from "react-router-dom";
import { Project } from "../../types";

import { SpaceBetween, FormField, Input } from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";
import { localizedPageTypeName } from "../Generic/GenericFunctions";
import { PageType } from "../Generic/GenericInterfaces";
import GenericBreadcrumbGroup from "../Generic/GerenicBreadcrumbGroup";

export interface Fields {
  title: string;
  description: string;
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
  title: "",
  description: "",
};

export const notLoadedRecord: Project = {
  id: "",
  title: "Carregando...",
  description: "Este projeto não está cadastrado no sistema.",
  collections: [],
  notes: [],
};

interface BreadcrumbGroupItemsProps {
  pageType: PageType;
}
export const breadcrumpGroupItems = ({
  pageType,
}: BreadcrumbGroupItemsProps) => {
  const { id } = useParams();
  const breadcrumbsItemsList = [
    { text: "Projetos", href: useHref(`/projects`) },
  ];
  if (pageType !== "list") {
    if (pageType === "edit") {
      breadcrumbsItemsList.push({
        text: `Projeto`,
        href: useHref(`/projects/${id}`),
      });
    }
    breadcrumbsItemsList.push({
      text: `${localizedPageTypeName(pageType)} projeto`,
      href: "#",
    });
  }
  return breadcrumbsItemsList;
};

export function validateFields(inputValues: Fields): boolean {
  if (inputValues.title && inputValues.description) {
    return true;
  } else return false;
}

export function RecordForm(props: ImplementedRecordFormProps) {
  const commonAttributes: any = {
    recordCategorySingular: `projeto`,
    recordCategoryPlural: `projetos`,
    recordGenderFeminine: false,
    description: `Um projeto é uma coleção que guarda registros de todas as coletas realizadas com um propósito em comum.`,
    navbarActiveLink: `/projects`,
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
      <FormField label="Nome">
        <Input
          value={inputValues.title}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              title: event.detail.value,
            }))
          }
        />
      </FormField>
      <FormField label="Descrição">
        <Input
          value={inputValues.description}
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
