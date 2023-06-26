import { AxiosResponse } from "axios";
import { NavigateFunction, useHref, useParams } from "react-router-dom";
import { DataType, Equipment, Parameter } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  Select,
  Multiselect,
  SelectProps,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../../generic/GenericPages/GenericCreateAndEditPage";
import {
  OptionStringDataType as Option,
  PageType,
} from "../../generic/GenericInterfaces";
import {
  fetchRecordData,
  localizedPageTypeName,
  searchLabelByValue,
} from "../../generic/GenericFunctions";
import { OptionDefinition } from "@cloudscape-design/components/internal/components/option/interfaces";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

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

type ImplementedRecordFormProps = GenericRecordFormProps &
  FormFieldsProps & {
    cancelRedirectLink: string;
  };

const dataTypeOptions: Array<Option> = [
  {
    label: "Real",
    value: DataType.real,
  },
  {
    label: "Inteiro",
    value: DataType.integer,
  },
  {
    label: "Texto",
    value: DataType.text,
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
  dataType: DataType.real,
  equipmentList: [],
  measurements: [],
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
      text: "Parâmetros",
      href: useHref(`/parameters`),
    },
  ];
  if (pageType !== "list") {
    if (pageType === "edit") {
      breadcrumbsItemsList.push({
        text: `Parâmetro`,
        href: useHref(`/parameters/${id}`),
      });
    }
    breadcrumbsItemsList.push({
      text: `${localizedPageTypeName(pageType)} parâmetro`,
      href: "#",
    });
  }
  return breadcrumbsItemsList;
};

export function formatDataType(dataType: string): string {
  return searchLabelByValue(dataTypeOptions, dataType);
}

export function fetchAllEquipmentOptionsList({
  navigate,
  setAllEquipmentOptionsList,
}: {
  navigate: NavigateFunction;
  setAllEquipmentOptionsList: Function;
}) {
  fetchRecordData(
    `/equipment`,
    navigate,
    function (response: AxiosResponse<any, any>) {
      setAllEquipmentOptionsList(
        response.data.map((item: Equipment) => ({
          value: item.id,
          label: item.name,
        }))
      );
    }
  );
}

export function validateFields(inputValues: Fields): boolean {
  const validName = inputValues.name ? inputValues.name !== `` : false;
  const validEquipmentList =
    inputValues.equipmentList && inputValues.equipmentList.length > 0;
  return validName && validEquipmentList;
}

export function formattedFields(record: Parameter): Fields {
  return {
    name: record.name,
    unit: record.unit,
    dataType: {
      label: formatDataType(record.dataType),
      value: record.dataType,
    },
    equipmentList: record.equipmentList.map((equipment: Equipment) => {
      return {
        value: equipment.id,
        label: equipment.name,
      };
    }),
  };
}

export function getSendableData(inputValues: Fields): Parameter {
  return {
    id: ``,
    name: inputValues.name,
    unit: inputValues.unit,
    dataType: inputValues.dataType.value,
    equipmentList: inputValues.equipmentList.map(
      (equipmentOption: OptionDefinition) => {
        return { id: equipmentOption.value ?? ``, name: `` };
      }
    ),
    measurements: [],
  };
}

export function RecordForm(props: ImplementedRecordFormProps) {
  const commonAttributes: any = {
    recordCategorySingular: `parâmetro`,
    recordCategoryPlural: `parâmetros`,
    recordGenderFeminine: false,
    description: `Um parâmetro é a característica que se pretende aferir de determinado ponto.`,
    navbarActiveLink: `/parameters`,
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
