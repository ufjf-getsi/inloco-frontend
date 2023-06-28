import { AxiosResponse } from "axios";
import { NavigateFunction, useHref, useParams } from "react-router-dom";
import { useState } from "react";

import {
  Measurement,
  Parameter,
  Point,
  Supply,
  Supply_VisitPoint,
  VisitPoint,
} from "../../types";
import { PageType } from "../../clientTypes";
import {
  convertStringToInteger,
  localizedPageTypeName,
} from "../../functions/util";
import { fetchRecordData } from "../../functions/controller";

import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../../generic/pages/GenericCreateAndEditPage";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";
import { notLoadedRecord as notLoadedPoint } from "../Point/GenericPoint";
import { notLoadedRecord as notLoadedCollection } from "../Collection/GenericCollection";
import { notLoadedRecord as notLoadedParameter } from "../Parameter/GenericParameter";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import {
  SpaceBetween,
  FormField,
  Input,
  SelectProps,
  Multiselect,
  AttributeEditor,
  Select,
  Box,
  Container,
  Header,
} from "@cloudscape-design/components";

interface AttributeSelectorSupply {
  supplyId: string;
  quantity: string;
  invalid: boolean;
  type: OptionDefinition;
  stock: number;
}

export interface Fields {
  actualCoordinates: string;
  parameters: SelectProps.Options;
  supplies: AttributeSelectorSupply[];
  point: SelectProps.Option;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
  allParameterOptionsList: SelectProps.Options;
  allSupplies: Supply[];
  allPointsNotVisited: SelectProps.Options;
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
  supplies: [],
  point: { value: "", label: "" },
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

export async function fetchAllParameterOptionsList({
  navigate,
  setAllParameterOptionsList,
}: {
  navigate: NavigateFunction;
  setAllParameterOptionsList: Function;
}) {
  await fetchRecordData(
    `/parameters`,
    navigate,
    async function (response: AxiosResponse<any, any>) {
      setAllParameterOptionsList(
        response.data.map((item: Parameter) => ({
          value: item.id,
          label: `${item.name}${item.unit ? ` (${item.unit})` : ``}`,
        }))
      );
    }
  );
}

export async function fetchAllSupplies({
  navigate,
  setAllSupplies,
}: {
  navigate: NavigateFunction;
  setAllSupplies: Function;
}) {
  await fetchRecordData(
    `/supplies`,
    navigate,
    async function (response: AxiosResponse<any, any>) {
      setAllSupplies(response.data);
    }
  );
}

export async function fetchAllPointsNotVisited({
  navigate,
  setAllPointsNotVisited,
  collectionId,
  point,
}: {
  navigate: NavigateFunction;
  setAllPointsNotVisited: Function;
  collectionId: string;
  point?: Point;
}) {
  await fetchRecordData(
    `/collections/${collectionId}/not-visited-points`,
    navigate,
    async function (response: AxiosResponse<any, any>) {
      const allPointsNotVisited = response.data.map(
        (item: Point): SelectProps.Option => {
          return {
            value: item.id,
            label: item.name,
          };
        }
      );
      if (point && point.id !== "") {
        allPointsNotVisited.push({
          value: point.id,
          label: point.name,
        });
      }
      setAllPointsNotVisited(allPointsNotVisited);
    }
  );
}

export function validateFields(inputValues: Fields): boolean {
  // TODO: validate coordinates and supplies
  const validPoint = inputValues.point ? inputValues.point.value !== "" : false;
  const validActualCoordinates = inputValues.actualCoordinates
    ? inputValues.actualCoordinates !== ""
    : false;
  const validParameters = inputValues.parameters
    ? inputValues.parameters.length > 0
    : false;
  return validActualCoordinates && validParameters && validPoint;
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
    supplies: record.supply_VisitPointList.map(
      (supply_VisitPoint: Supply_VisitPoint) => {
        return {
          supplyId: supply_VisitPoint.supply.id,
          quantity: supply_VisitPoint.quantity.toString(),
          invalid: false,
          type: {
            value: supply_VisitPoint.supply.id,
            label: supply_VisitPoint.supply.name,
          },
          stock: supply_VisitPoint.supply.stock,
        };
      }
    ),
    point: {
      value: record.point.id,
      label: record.point.name,
    },
  };
}

export function getSendableData({
  parentId,
  inputValues,
}: {
  parentId?: string;
  inputValues: Fields;
}): VisitPoint {
  const point = { ...notLoadedPoint, id: inputValues.point.value ?? "" };
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
            ...notLoadedParameter,
            id: selectedOption.value ?? "",
          },
        };
      }
    ),
    supply_VisitPointList: inputValues.supplies.map(
      (supply: AttributeSelectorSupply): Supply_VisitPoint => {
        return {
          id: "",
          quantity: convertStringToInteger(supply.quantity),
          supply: {
            id: supply.supplyId,
            name: "",
            stock: 0,
          },
        };
      }
    ),
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
        allSupplies={props.allSupplies}
        allPointsNotVisited={props.allPointsNotVisited}
      />
    </GenericCreateAndEditPage>
  );
}

function FormFields({
  inputValues,
  setInputValues,
  allParameterOptionsList,
  allSupplies,
  allPointsNotVisited,
}: FormFieldsProps) {
  if (
    !inputValues ||
    !allParameterOptionsList ||
    !allSupplies ||
    !allPointsNotVisited
  )
    return <></>;

  const positiveStockSuppliesSelectOptions: SelectProps.Option[] = [];
  allSupplies.forEach((supply) => {
    if (supply.stock > 0) {
      positiveStockSuppliesSelectOptions.push({
        value: supply.id,
        label: supply.name,
      });
    }
  });
  const [selectOptions, setSelectOptions] = useState<SelectProps.Options>(
    positiveStockSuppliesSelectOptions
  );
  const [selectedOption, setSelectedOption] = useState<SelectProps.Option>(
    selectOptions[0]
  );

  function allowedToInsertItem(): boolean {
    let returnValue = true;
    if (selectedOption && selectedOption.value !== "") {
      const supplyIdFromSelect = selectedOption.value;
      inputValues.supplies.forEach((supplyItem) => {
        const supplyIdFromFilledItem = supplyItem.type.value;
        if (supplyIdFromFilledItem && supplyIdFromFilledItem !== "") {
          if (supplyIdFromFilledItem === supplyIdFromSelect)
            returnValue = false;
        } else return false;
      });
    } else return false;
    return returnValue;
  }

  return (
    <SpaceBetween size="l">
      <FormField label="Ponto">
        <Select
          selectedOption={
            inputValues.point.value !== "" ? inputValues.point : null
          }
          onChange={({ detail }) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              point: detail.selectedOption,
            }))
          }
          options={allPointsNotVisited}
          loadingText="Carregando pontos"
          placeholder="Selecione o ponto de visita"
          selectedAriaLabel="Selecionado"
          statusType={
            allPointsNotVisited
              ? allPointsNotVisited.length > 0
                ? "finished"
                : "loading"
              : "error"
          }
        />
      </FormField>

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

      <Container header={<Header variant="h3">Suprimentos</Header>}>
        <SpaceBetween size="xs">
          <Select
            selectedOption={selectedOption}
            options={selectOptions}
            onChange={({ detail }) => {
              setSelectedOption(detail.selectedOption);
            }}
          />

          <AttributeEditor
            onAddButtonClick={() => {
              if (allowedToInsertItem()) {
                if (selectedOption.value) {
                  const supply = allSupplies.find(
                    (supply) => supply.id === selectedOption.value
                  );
                  // console.log("SelectedOption", selectedOption);
                  // console.log("Supply", supply);
                  if (supply)
                    setInputValues((prevState: Fields) => ({
                      ...prevState,
                      supplies: [
                        ...prevState.supplies,
                        {
                          supplyId: supply.id,
                          quantity: "1",
                          invalid: false,
                          type: selectedOption,
                          stock: supply.stock,
                        },
                      ],
                    }));
                }
              }
            }}
            onRemoveButtonClick={({ detail }) => {
              const tmpItems = [...inputValues.supplies];
              tmpItems.splice(detail.itemIndex, 1);
              setInputValues((prevState: Fields) => ({
                ...prevState,
                supplies: tmpItems,
              }));
            }}
            items={inputValues.supplies}
            addButtonText="Incluir suprimento"
            definition={[
              {
                label: "Suprimento",
                control: (item) => (
                  <Box>{`${item.type.label} (${item.stock})`}</Box>
                ),
              },
              {
                label: "Quantidade",
                control: (item) => (
                  <Input
                    invalid={item.invalid}
                    value={item.quantity}
                    placeholder="Quantidade"
                    inputMode="numeric"
                    onChange={(event) => {
                      // console.log("Items", inputValues.supplies);
                      // console.log("Texto", event.detail.value);
                      const isNumeric = /^\d*$/.test(event.detail.value);
                      // console.log("É numérico", isNumeric);
                      if (isNumeric)
                        setInputValues((prevState: Fields) => ({
                          ...prevState,
                          supplies: prevState.supplies.map((prevItem) => {
                            if (prevItem.supplyId === item.supplyId) {
                              const actualQuantity = convertStringToInteger(
                                event.detail.value
                              );
                              const isInsideBounds =
                                actualQuantity > 0 &&
                                actualQuantity <= item.stock;
                              // console.log(
                              //   "É menor que o limite",
                              //   isInsideBounds
                              // );
                              return {
                                ...prevItem,
                                invalid: !isInsideBounds,
                                quantity: event.detail.value,
                              };
                            }
                            return prevItem;
                          }),
                        }));
                    }}
                  />
                ),
              },
            ]}
            removeButtonText={"Excluir"}
          />
        </SpaceBetween>
      </Container>
    </SpaceBetween>
  );
}
