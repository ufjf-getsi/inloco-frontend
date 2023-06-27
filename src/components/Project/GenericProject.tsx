import { useHref, useParams } from "react-router-dom";

import { Project } from "../../types";
import { PageType } from "../../clientTypes";
import { localizedPageTypeName } from "../../functions/util";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../../generic/pages/GenericCreateAndEditPage";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";
import {
  SpaceBetween,
  FormField,
  Input,
  DatePicker,
} from "@cloudscape-design/components";

export interface Fields {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
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
  startDate: "",
  endDate: "",
};

export const notLoadedRecord: Project = {
  id: "",
  title: "Carregando...",
  description: "Este projeto não está cadastrado no sistema.",
  collections: [],
  startDate: new Date(),
  endDate: new Date(),
  points: [],
  researcher_ProjectList: [],
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
  const validTitle = inputValues.title ? inputValues.title !== "" : false;
  const validDescription =
    validTitle && inputValues.description
      ? inputValues.description !== ""
      : false;
  if (validDescription && inputValues.startDate && inputValues.endDate) {
    let validStartDate = inputValues.startDate !== "";
    const startDate = new Date(inputValues.startDate);
    validStartDate = startDate && startDate !== null;
    let validEndDate = inputValues.endDate !== "";
    const endDate = new Date(inputValues.endDate);
    validEndDate = endDate && endDate !== null && endDate >= startDate;
    return validTitle && validDescription && validStartDate && validEndDate;
  }
  return false;
}

export function formattedFields(record: Project): Fields {
  return {
    title: record.title,
    description: record.description,
    startDate: record.startDate.toString(),
    endDate: record.endDate.toString(),
  };
}

export function getSendableData(inputValues: Fields): Project {
  return {
    id: "",
    title: inputValues.title,
    description: inputValues.description,
    collections: [],
    startDate: new Date(inputValues.startDate),
    endDate: new Date(inputValues.endDate),
    points: [],
    researcher_ProjectList: [],
  };
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
      <FormField label="Nome">
        <Input
          value={inputValues.title}
          placeholder={`Nome do projeto`}
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
          placeholder={`Descrição do projeto`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              description: event.detail.value,
            }))
          }
        />
      </FormField>

      <FormField label="Data de início">
        <DatePicker
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              startDate: event.detail.value,
            }))
          }
          value={inputValues.startDate}
          nextMonthAriaLabel="Next month"
          placeholder="YYYY/MM/DD"
          previousMonthAriaLabel="Previous month"
          todayAriaLabel="Today"
        />
      </FormField>

      <FormField label="Data de fim">
        <DatePicker
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              endDate: event.detail.value,
            }))
          }
          value={inputValues.endDate}
          nextMonthAriaLabel="Next month"
          placeholder="YYYY/MM/DD"
          previousMonthAriaLabel="Previous month"
          todayAriaLabel="Today"
        />
      </FormField>
    </SpaceBetween>
  );
}
