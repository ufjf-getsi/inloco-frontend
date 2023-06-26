import { AxiosResponse } from "axios";
import { NavigateFunction, useHref, useParams } from "react-router-dom";
import {
  DataType,
  Measurement,
  Parameter,
  Point,
  VisitPoint,
} from "../../types";

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
import { notLoadedRecord as notLoadedPoint } from "../Point/GenericPoint";
import { notLoadedRecord as notLoadedCollection } from "../Collection/GenericCollection";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";

export interface Fields {
  actualCoordinates: string;
  parameters: SelectProps.Options;
  // point: OptionDefinition;
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
  actualCoordinates: "",
  parameters: [],
};

export const notLoadedRecord: VisitPoint = {
  id: "",
  actualCoordinates: "",
  orderOnRoute: 0,
  measurements: [],
  supply_VisitPointList: [],
  point: notLoadedPoint,
  collection: notLoadedCollection,
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
        text: `Visita`,
        href: useHref(`/visit-point/${id}`),
      });
    }
    breadcrumbsItemsList.push({
      text: `${localizedPageTypeName(pageType)} visita${
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
          label: `${item.name}${item.unit ? ` (${item.unit})` : ``}`,
        }))
      );
    }
  );
}

export function validateFields(inputValues: Fields): boolean {
  // TODO: validate coordinates
  const validActualCoordinates = inputValues.actualCoordinates
    ? inputValues.actualCoordinates !== ""
    : false;
  const validParameters = inputValues.parameters
    ? inputValues.parameters.length > 0
    : false;
  return validActualCoordinates && validParameters;
}

export function formattedFields(record: VisitPoint): Fields {
  return {
    actualCoordinates: record.actualCoordinates,
    parameters: record.measurements.map((measurement: Measurement) => {
      return {
        value: measurement.parameter.id,
        label: measurement.parameter.name,
      };
    }),
  };
}

export function getSendableData({
  parentId,
  inputValues,
}: {
  parentId?: string;
  inputValues: Fields;
}): VisitPoint {
  // const point = { ...notLoadedPoint, id: inputValues.point.value };
  const point = { ...notLoadedPoint, id: "" };
  const collection = { ...notLoadedCollection, id: parentId ?? "" };
  return {
    id: "",
    actualCoordinates: inputValues.actualCoordinates,
    orderOnRoute: 0,
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
            dataType: DataType.real,
            equipmentList: [],
            measurements: [],
          },
        };
      }
    ),
    // TODO: supply_VisitPointList
    supply_VisitPointList: [],
    point: point,
    collection: collection,
  };
}

export function RecordForm(props: ImplementedRecordFormProps) {
  const commonAttributes: any = {
    recordCategorySingular: `visita`,
    recordCategoryPlural: `visitas`,
    recordGenderFeminine: true,
    description: `Uma visita a um ponto é o planejamento de parâmetros a serem aferidos em determinado ponto em uma coleta.`,
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
      <FormField label="Coordenadas aferidas">
        <Input
          value={inputValues.actualCoordinates}
          placeholder={`Coordenadas aferidas no local`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              actualCoordinates: event.detail.value,
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
