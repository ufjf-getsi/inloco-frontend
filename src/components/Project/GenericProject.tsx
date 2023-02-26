import { Project } from "../../types";

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
  title: string;
  description: string;
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
  title: "",
  description: "",
};

export const notLoadedProject: Project = {
  id: "",
  title: "Carregando...",
  description: "Este projeto não está cadastrado no sistema.",
  collections: [],
  notes: [],
};

export function validateFields(inputValues: Fields): boolean {
  if (inputValues.title && inputValues.description) {
    return true;
  } else return false;
}

export function RecordForm(props: ImplementedRecordFormProps) {
  return (
    <GenericCreateAndEditPage
      edit={props.edit}
      recordCategorySingular={`projeto`}
      recordCategoryPlural={`projetos`}
      recordGenderFeminine={false}
      description={`Um projeto é uma coleção que guarda registros de todas as coletas realizadas com um propósito em comum.`}
      navbarActiveLink={`/projects`}
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Projetos", href: "/projects" },
            { text: props.edit ? `Editar` : `Criar` + " projeto", href: "#" },
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
