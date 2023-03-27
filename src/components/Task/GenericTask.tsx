import { Task } from "../../types";

import { SpaceBetween, FormField, Input } from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";
import { localizedPageTypeName } from "../Generic/GenericFunctions";
import { PageType } from "../Generic/GenericInterfaces";
import GenericBreadcrumbGroup from "../Generic/GerenicBreadcrumbGroup";

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

export const notLoadedRecord: Task = {
  id: "",
  collectionId: "",
  title: "Carregando...",
  isPending: true,
  url: "",
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
  const projectBreadcrumbLink = `/projects${
    projectId && projectId !== "" ? "/" + projectId : ""
  }`;
  const collectionBreadcrumbLink =
    collectionId && collectionId !== ""
      ? `/collections/${collectionId}`
      : `${import.meta.env.VITE_BASE_URL_HASH}projects`;
  return [
    { text: "Projetos", href: `${import.meta.env.VITE_BASE_URL_HASH}projects` },
    {
      text: "Projeto",
      href: projectBreadcrumbLink,
    },
    {
      text: "Tarefa",
      href: collectionBreadcrumbLink,
    },
    ...(pageType !== "list"
      ? [
          {
            text: `${localizedPageTypeName(pageType)} tarefa`,
            href: "#",
          },
        ]
      : []),
  ];
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
      recordCategorySingular={`tarefa`}
      recordCategoryPlural={`tarefas`}
      recordGenderFeminine={true}
      description={`Tarefas incluem equipamentos necessários, parâmetros a aferir, e outras atividades.`}
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
      />
    </GenericCreateAndEditPage>
  );
}

function FormFields({ inputValues, setInputValues }: FormFieldsProps) {
  return (
    <SpaceBetween size="l">
      <FormField label="Título">
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
