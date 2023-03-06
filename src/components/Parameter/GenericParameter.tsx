import axios from "axios";
import { NavigateFunction } from "react-router-dom";
import { Equipment, Parameter } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  BreadcrumbGroup,
  Select,
  Multiselect,
  SelectProps,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";
import {
  OptionStringString as Option,
  PageType,
} from "../Generic/GenericInterfaces";
import {
  cancelLoadAndRedirectBackwards,
  localizedPageTypeName,
} from "../Generic/GenericFunctions";

export interface Fields {
  name: string;
  unit: string;
  dataType: Option;
  equipmentList: SelectProps.Options;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
  allEquipmentOptionsList: SelectProps.Options;
}

interface ImplementedRecordFormProps
  extends GenericRecordFormProps,
    FormFieldsProps {
  cancelRedirectLink: string;
}

const dataTypeOptions: Array<Option> = [
  {
    label: "Real",
    value: "real",
  },
  {
    label: "Inteiro",
    value: "integer",
  },
  {
    label: "Texto",
    value: "text",
  },
];

export const emptyFields: Fields = {
  name: "",
  unit: "",
  dataType: dataTypeOptions[0],
  equipmentList: [],
};

export const notLoadedRecord: Parameter = {
  id: "",
  name: "Carregando...",
  unit: "",
  dataType: "",
  equipmentList: [],
};

interface BreadcrumbGroupItemsProps {
  pageType: PageType;
}
export const breadcrumpGroupItems = ({
  pageType,
}: BreadcrumbGroupItemsProps) => {
  return [
    { text: "Parâmetros", href: "/parameters" },
    ...(pageType !== "list"
      ? [
          {
            text: `${localizedPageTypeName(pageType)} parâmetro`,
            href: "#",
          },
        ]
      : []),
  ];
};

export function fetchAllEquipmentOptionsList({
  navigate,
  setAllEquipmentOptionsList,
}: {
  navigate: NavigateFunction;
  setAllEquipmentOptionsList: Function;
}) {
  axios
    .get<Equipment[]>(`${import.meta.env.VITE_SERVER_URL}/equipment`)
    .then((response) => {
      setAllEquipmentOptionsList(
        response.data.map((item: Equipment) => ({
          value: item.id,
          label: item.name,
        }))
      );
    })
    .catch((error) =>
      cancelLoadAndRedirectBackwards({
        navigate: navigate,
        error: error,
        previousPageLink: `/parameters`,
      })
    );
}

export function formatDataType(dataType: string): string {
  return (
    dataTypeOptions.find((option) => {
      return option.value === dataType;
    })?.label ?? dataType
  );
}

export function validateFields(inputValues: Fields): boolean {
  if (
    inputValues.name &&
    inputValues.dataType.value &&
    inputValues.equipmentList.length > 0
  ) {
    return true;
  } else return false;
}

export function RecordForm(props: ImplementedRecordFormProps) {
  return (
    <GenericCreateAndEditPage
      edit={props.edit}
      recordCategorySingular={`parâmetro`}
      recordCategoryPlural={`parâmetros`}
      recordGenderFeminine={false}
      description={`Um parâmetro é a característica que se pretende aferir de determinado ponto.`}
      navbarActiveLink={`/parameters`}
      breadcrumbs={
        <BreadcrumbGroup
          items={breadcrumpGroupItems({
            pageType: props.edit ? "edit" : "create",
          })}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
      cancelRedirectLink={props.cancelRedirectLink}
      handleSubmit={props.handleSubmit}
      alertVisible={props.alertVisible}
      setAlertVisible={props.setAlertVisible}
      alertType={props.alertType}
    >
      <FormFields
        inputValues={props.inputValues}
        setInputValues={props.setInputValues}
        allEquipmentOptionsList={props.allEquipmentOptionsList}
      />
    </GenericCreateAndEditPage>
  );
}

function FormFields({
  inputValues,
  setInputValues,
  allEquipmentOptionsList,
}: FormFieldsProps) {
  return (
    <SpaceBetween size="l">
      <FormField label="Parâmetro">
        <Input
          value={inputValues.name}
          placeholder={`Nome do parâmetro`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              name: event.detail.value,
            }))
          }
        />
      </FormField>
      <FormField label="Unidade">
        <Input
          value={inputValues.unit}
          placeholder={`N/A`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              unit: event.detail.value,
            }))
          }
        />
      </FormField>
      <FormField label="Medida">
        <Select
          selectedOption={inputValues.dataType}
          onChange={({ detail }) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              dataType: detail.selectedOption,
            }))
          }
          options={dataTypeOptions}
          selectedAriaLabel="Selected"
        />
      </FormField>
      <FormField label="Equipamentos">
        <Multiselect
          selectedOptions={inputValues.equipmentList}
          onChange={({ detail }) => {
            setInputValues((prevState: Fields) => ({
              ...prevState,
              equipmentList: detail.selectedOptions,
            }));
          }}
          deselectAriaLabel={(e) => `Remove ${e.label}`}
          options={allEquipmentOptionsList}
          loadingText="Carregando equipamentos"
          placeholder="Selecione os equipamentos requeridos"
          selectedAriaLabel="Selecionado"
          statusType={
            allEquipmentOptionsList
              ? allEquipmentOptionsList.length > 0
                ? "finished"
                : "loading"
              : "error"
          }
        />
      </FormField>
    </SpaceBetween>
  );
}
