import { AxiosResponse } from "axios";
import { NavigateFunction, useHref, useParams } from "react-router-dom";
import { Measurement, Parameter, Point } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  SelectProps,
  Multiselect,
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
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";

export interface Fields {
  name: string;
  plannedCoordinates: string;
  parameters: SelectProps.Options;
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
    collectionId?: string;
  };

export const emptyFields: Fields = {
  name: "",
  plannedCoordinates: "",
  parameters: [],
};

export const notLoadedRecord: Point = {
  id: "",
  collectionId: "",
  orderOnRoute: 0,
  name: "Carregando...",
  plannedCoordinates: "",
  actualCoordinates: "",
  measurements: [],
};

interface BreadcrumbGroupItemsProps {
  projectId?: string;
  collectionId?: string;
  pageType: PageType;
}
export const breadcrumpGroupItems = ({
  projectId,
  collectionId,
  pageType,
}: BreadcrumbGroupItemsProps) => {
  const { id } = useParams();
  const projectBreadcrumbLink = useHref(
    `/projects${projectId && projectId !== "" ? "/" + projectId : ""}`
  );
  const collectionBreadcrumbLink = useHref(
    `/${
      collectionId && collectionId !== ""
        ? `collections/${collectionId}`
        : `projects`
    }`
  );
  const breadcrumbsItemsList = [
    { text: "Projetos", href: useHref(`/projects`) },
    {
      text: "Projeto",
      href: projectBreadcrumbLink,
    },
    {
      text: "Coleta",
      href: collectionBreadcrumbLink,
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
      text: `${localizedPageTypeName(pageType)} ponto${
        pageType === "reorder" ? "s" : ""
      }`,
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
  if (
    inputValues.name &&
    inputValues.plannedCoordinates &&
    inputValues.parameters.length > 0
  ) {
    return true;
  } else return false;
}

export function getSendableData({
  parentId,
  inputValues,
}: {
  parentId?: string;
  inputValues: Fields;
}): Point {
  return {
    id: "",
    collectionId: parentId ?? "",
    orderOnRoute: 0,
    name: inputValues.name,
    plannedCoordinates: inputValues.plannedCoordinates,
    actualCoordinates: "",
    measurements: inputValues.parameters.map(
      (selectedOption: OptionDefinition): Measurement => {
        return {
          id: "",
          isPending: true,
          result: "",
          parameter: {
            id: selectedOption.value ?? "",
            name: "",
            unit: "",
            dataType: "",
            equipmentList: [],
          },
        };
      }
    ),
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
          collectionId: props.collectionId,
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

function FormFields({
  inputValues,
  setInputValues,
  allParameterOptionsList,
}: FormFieldsProps) {
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
      <FormField label="Parâmetros">
        <Multiselect
          selectedOptions={inputValues.parameters}
          onChange={({ detail }) => {
            setInputValues((prevState: Fields) => ({
              ...prevState,
              parameters: detail.selectedOptions,
            }));
          }}
          deselectAriaLabel={(e) => `Remove ${e.label}`}
          options={allParameterOptionsList}
          loadingText="Carregando parâmetros"
          placeholder="Selecione os parâmetros"
          selectedAriaLabel="Selecionado"
          statusType={
            allParameterOptionsList
              ? allParameterOptionsList.length > 0
                ? "finished"
                : "loading"
              : "error"
          }
        />
      </FormField>
    </SpaceBetween>
  );
}
