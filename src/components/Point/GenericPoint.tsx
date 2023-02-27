import { useState } from "react";
import { Point } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  BreadcrumbGroup,
  SelectProps,
  Multiselect,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";

export interface Fields {
  name: string;
  coordinates: string;
  parameters: SelectProps.Options;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
  allParameterOptionsList: SelectProps.Options;
}

interface ImplementedRecordFormProps
  extends GenericRecordFormProps,
    FormFieldsProps {
  cancelRedirectLink: string;
  projectId?: string;
  collectionId?: string;
}

export const emptyFields: Fields = {
  name: "",
  coordinates: "",
  parameters: [],
};

export const notLoadedRecord: Point = {
  id: "",
  collectionId: "",
  name: "Carregando...",
  coordinates: "",
  measurements: [],
};

export function validateFields(inputValues: Fields): boolean {
  if (
    inputValues.name &&
    inputValues.coordinates &&
    inputValues.parameters.length > 0
  ) {
    return true;
  } else return false;
}

export function RecordForm(props: ImplementedRecordFormProps) {
  const projectBreadcrumbLink = `/projects${
    props.projectId && props.projectId !== "" ? "/" + props.projectId : ""
  }`;
  const collectionBreadcrumbLink =
    props.collectionId && props.collectionId !== ""
      ? `/collections/${props.collectionId}`
      : "/projects";

  return (
    <GenericCreateAndEditPage
      edit={props.edit}
      recordCategorySingular={`ponto`}
      recordCategoryPlural={`pontos`}
      recordGenderFeminine={false}
      description={`Um ponto é determinada localização de onde se deve aferir parâmetros.`}
      navbarActiveLink={`/projects`}
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Projetos", href: "/projects" },
            {
              text: "Projeto",
              href: projectBreadcrumbLink,
            },
            {
              text: "Coleta",
              href: collectionBreadcrumbLink,
            },
            { text: (props.edit ? `Editar` : `Criar`) + " ponto", href: "#" },
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
          value={inputValues.coordinates}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              coordinates: event.detail.value,
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
