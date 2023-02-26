import { Equipment } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  BreadcrumbGroup,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";

export interface Fields {
  name: string;
  // selectedOptions: SelectProps.Options;
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

export const emptyFields: Fields = {
  name: "",
};

export const notLoadedRecord: Equipment = {
  id: "",
  name: "Carregando...",
};

export function validateFields(inputValues: Fields): boolean {
  if (inputValues.name) {
    return true;
  } else return false;
}

export function RecordForm(props: ImplementedRecordFormProps) {
  return (
    <GenericCreateAndEditPage
      edit={props.edit}
      recordCategorySingular={`equipamento`}
      recordCategoryPlural={`equipamentos`}
      recordGenderFeminine={false}
      description={`Equipamentos disponíveis para as aferições no campo.`}
      navbarActiveLink={`/equipment`}
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Equipamentos", href: "/equipment" },
            {
              text: (props.edit ? `Editar` : `Criar`) + " equipamento",
              href: "#",
            },
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
      <FormField label="Equipamento">
        <Input
          value={inputValues.name}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              name: event.detail.value,
            }))
          }
        />
      </FormField>
      {/* <FormField label="Parâmetro(s) medido(s)">
            <Multiselect
              selectedOptions={selectedOptions}
              onChange={({ detail }) =>
                setSelectedOptions(detail.selectedOptions)
              }
              deselectAriaLabel={(e) => `Remove ${e.label}`}
              options={parameters}
              loadingText="Carregando parâmetros"
              placeholder="Selecione os parâmetros"
              selectedAriaLabel="Selecionado"
              statusType={
                parameters
                  ? parameters.length > 0
                    ? "finished"
                    : "loading"
                  : "error"
              }
            />
          </FormField> */}
    </SpaceBetween>
  );
}
