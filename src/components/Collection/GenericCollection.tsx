import { Collection } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  BreadcrumbGroup,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";
import { localizedPageTypeName } from "../Generic/GenericFunctions";
import { PageType } from "../Generic/GenericInterfaces";
import { useParams } from "react-router-dom";

export interface Fields {
  title: string;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
}

interface ImplementedRecordFormProps
  extends GenericRecordFormProps,
    FormFieldsProps {
  cancelRedirectLink: string;
  projectId?: string;
  collectionId?: string;
}

export const emptyFields: Fields = {
  title: "",
};

export const notLoadedRecord: Collection = {
  id: "",
  projectId: "",
  title: "Carregando...",
  points: [],
  tasks: [],
};

interface BreadcrumbGroupItemsProps {
  projectId?: string;
  collectionId?: string;
  pageType: PageType;
}
export const breadcrumpGroupItems = ({
  projectId,
  pageType,
}: BreadcrumbGroupItemsProps) => {
  const { id } = useParams();
  const breadcrumbsItemsList = [
    { text: "Projetos", href: `${import.meta.env.VITE_BASE_URL_HASH}projects` },
    {
      text: "Projeto",
      href: `${import.meta.env.VITE_BASE_URL_HASH}projects${
        projectId && projectId !== "" ? "/" + projectId : ""
      }`,
    },
  ];
  if (pageType !== "list") {
    if (pageType === "edit") {
      breadcrumbsItemsList.push({
        text: `Coleta`,
        href: `${import.meta.env.VITE_BASE_URL_HASH}collections/${id}`,
      });
    }
    breadcrumbsItemsList.push({
      text: `${localizedPageTypeName(pageType)} coleta`,
      href: "#",
    });
  }
  return breadcrumbsItemsList;
};

export function validateFields(inputValues: Fields): boolean {
  if (inputValues.title) {
    return true;
  } else return false;
}

export function RecordForm(props: ImplementedRecordFormProps) {
  return (
    <GenericCreateAndEditPage
      edit={props.edit}
      recordCategorySingular={`coleta`}
      recordCategoryPlural={`coletas`}
      recordGenderFeminine={true}
      description={`Uma coleta é uma expedição realizada a fim de obter dados de determinados pontos.`}
      navbarActiveLink={`/projects`}
      breadcrumbs={
        <BreadcrumbGroup
          items={breadcrumpGroupItems({
            projectId: props.projectId,
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
    </SpaceBetween>
  );
}
