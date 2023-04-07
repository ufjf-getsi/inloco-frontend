import axios from "axios";
import { NavigateFunction, useHref, useParams } from "react-router-dom";
import { Parameter, Point } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  SelectProps,
  Multiselect,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";
import {
  cancelLoadAndRedirectBackwards,
  localizedPageTypeName,
} from "../Generic/GenericFunctions";
import { PageType } from "../Generic/GenericInterfaces";
import GenericBreadcrumbGroup from "../Generic/GerenicBreadcrumbGroup";

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

interface ImplementedRecordFormProps
  extends GenericRecordFormProps,
  FormFieldsProps {
  cancelRedirectLink: string;
  projectId?: string;
  collectionId?: string;
}

export const emptyFields: Fields = {
  name: "",
  plannedCoordinates: "",
  parameters: [],
};

export const notLoadedRecord: Point = {
  id: "",
  collectionId: "",
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
  const projectBreadcrumbLink = useHref(`/projects${projectId && projectId !== ""
    ? "/" + projectId : ""}`);
  const collectionBreadcrumbLink = useHref(`/${collectionId && collectionId !== ""
    ? `collections/${collectionId}`
    : `projects`}`);
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
      text: `${localizedPageTypeName(pageType)} ponto`,
      href: "#",
    });
  }
  return breadcrumbsItemsList;
};

export function fetchAllParameterOptionsList({
  navigate,
  collectionId,
  setAllParameterOptionsList,
}: {
  navigate: NavigateFunction;
  collectionId: string;
  setAllParameterOptionsList: Function;
}) {
  axios
    .get<Parameter[]>(`${import.meta.env.VITE_SERVER_URL}/parameters`)
    .then((response) => {
      setAllParameterOptionsList(
        response.data.map((item) => ({
          value: item.id,
          label: `${item.name} (${item.unit})`,
        }))
      );
    })
    .catch((error) =>
      cancelLoadAndRedirectBackwards({
        navigate: navigate,
        error: error,
        previousPageLink: useHref(`${collectionId
          ? `/collections/${collectionId}`
          : `/projects`}`),
      })
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

export function RecordForm(props: ImplementedRecordFormProps) {
  return (
    <GenericCreateAndEditPage
      edit={props.edit}
      recordCategorySingular={`ponto`}
      recordCategoryPlural={`pontos`}
      recordGenderFeminine={false}
      description={`Um ponto é determinada localização de onde se deve aferir parâmetros.`}
      navbarActiveLink={`/projects`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({
            projectId: props.projectId,
            collectionId: props.collectionId,
            pageType: props.edit ? "edit" : "create",
          })}
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
          value={inputValues.plannedCoordinates}
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
