import { Parameter } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  BreadcrumbGroup,
  Select,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";

interface Option {
  label: string;
  value: string;
}

export interface Fields {
  name: string;
  unit: string;
  dataType: Option;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
}

interface ImplementedRecordFormProps
  extends GenericRecordFormProps,
    FormFieldsProps {
  cancelRedirectLink: string;
}

const options: Array<Option> = [
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
  dataType: options[0],
};

export const notLoadedRecord: Parameter = {
  id: "",
  name: "Carregando...",
  unit: "",
  dataType: "",
  equipmentList: [],
};

export function formatDataType(dataType: string): string {
  return (
    options.find((option) => {
      return option.value === dataType;
    })?.label ?? dataType
  );
}

export function validateFields(inputValues: Fields): boolean {
  if (inputValues.name && inputValues.dataType.value) {
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
          items={[
            { text: "Parâmetros", href: "/parameters" },
            { text: props.edit ? `Editar` : `Criar` + " parâmetro", href: "#" },
          ]}
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
      />
    </GenericCreateAndEditPage>
  );
}

function FormFields({ inputValues, setInputValues }: FormFieldsProps) {
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
          options={options}
          selectedAriaLabel="Selected"
        />
      </FormField>
    </SpaceBetween>
  );
}
