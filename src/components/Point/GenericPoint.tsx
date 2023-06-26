import { AxiosResponse } from "axios";
import { NavigateFunction, useHref, useParams } from "react-router-dom";
import { Parameter, Point } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  SelectProps,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../../generic/GenericPages/GenericCreateAndEditPage";
import {
  fetchRecordData,
  localizedPageTypeName,
} from "../../generic/GenericFunctions";
import { PageType } from "../../generic/GenericInterfaces";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";
import { notLoadedRecord as notLoadedProject } from "../Project/GenericProject";

export interface Fields {
  name: string;
  plannedCoordinates: string;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
  allParameterOptionsList: SelectProps.Options;
}

export type ImplementedRecordFormProps = GenericRecordFormProps &
  FormFieldsProps & {
    cancelRedirectLink: string;
    projectId?: string;
  };

export const emptyFields: Fields = {
  name: "",
  plannedCoordinates: "",
};

export const notLoadedRecord: Point = {
  id: "",
  project: notLoadedProject,
  name: "Carregando...",
  plannedCoordinates: "",
};

interface BreadcrumbGroupItemsProps {
  projectId?: string;
  pageType: PageType;
}
export const breadcrumpGroupItems = ({
  projectId,
  pageType,
}: BreadcrumbGroupItemsProps) => {
  const { id } = useParams();
  const breadcrumbsItemsList = [
    { text: "Projetos", href: useHref(`/projects`) },
    {
      text: "Projeto",
      href: useHref(
        `/projects${projectId && projectId !== "" ? "/" + projectId : ""}`
      ),
    },
  ];
  if (pageType !== "list") {
    if (pageType === "edit") {
      breadcrumbsItemsList.push({
        text: `Ponto`,
        href: useHref(`/points/${id}`),
      });
    }
    breadcrumbsItemsList.push({
      text: `${localizedPageTypeName(pageType)} ponto`,
      href: "#",
    });
  }
  return breadcrumbsItemsList;
};

export function fetchAllParameterOptionsList({
  navigate,
  setAllParameterOptionsList,
}: {
  navigate: NavigateFunction;
  setAllParameterOptionsList: Function;
}) {
  fetchRecordData(
    `/parameters`,
    navigate,
    function (response: AxiosResponse<any, any>) {
      setAllParameterOptionsList(
        response.data.map((item: Parameter) => ({
          value: item.id,
          label: `${item.name} (${item.unit})`,
        }))
      );
    }
  );
}

export function validateFields(inputValues: Fields): boolean {
  // TODO: validate coordinates
  const validName = inputValues.name ? inputValues.name !== "" : false;
  const validPlannedCoordinates =
    validName && inputValues.plannedCoordinates
      ? inputValues.plannedCoordinates !== ""
      : false;
  return validName && validPlannedCoordinates;
}

export function formattedFields(record: Point): Fields {
  return {
    name: record.name,
    plannedCoordinates: record.plannedCoordinates,
  };
}

export function getSendableData({
  parentId,
  inputValues,
}: {
  parentId?: string;
  inputValues: Fields;
}): Point {
  const project = notLoadedProject;
  if (parentId) project.id = parentId;
  return {
    id: "",
    name: inputValues.name,
    plannedCoordinates: inputValues.plannedCoordinates,
    project: project,
  };
}

export function RecordForm(props: ImplementedRecordFormProps) {
  const commonAttributes: any = {
    recordCategorySingular: `ponto`,
    recordCategoryPlural: `pontos`,
    recordGenderFeminine: false,
    description: `Um ponto é determinada localização de onde se deve aferir parâmetros.`,
    navbarActiveLink: `/projects`,
    breadcrumbs: (
      <GenericBreadcrumbGroup
        items={breadcrumpGroupItems({
          projectId: props.projectId,
          pageType: props.edit ? "edit" : "create",
        })}
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
        allParameterOptionsList={props.allParameterOptionsList}
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
          placeholder={`Nome do ponto`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              name: event.detail.value,
            }))
          }
        />
      </FormField>

      <FormField label="Coordenadas">
        <Input
          value={inputValues.plannedCoordinates}
          placeholder={`Coordenadas do ponto`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              plannedCoordinates: event.detail.value,
            }))
          }
        />
      </FormField>
    </SpaceBetween>
  );
}
