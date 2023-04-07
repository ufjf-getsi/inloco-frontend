import { useHref, useParams } from "react-router-dom";
import { Task, TaskType } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  Select,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";
import {
  localizedPageTypeName,
  searchLabelByValue,
} from "../Generic/GenericFunctions";
import {
  PageType,
  OptionStringString as Option,
} from "../Generic/GenericInterfaces";
import GenericBreadcrumbGroup from "../Generic/GerenicBreadcrumbGroup";

export interface Fields {
  title: string;
  status: Option;
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

const statusOptions: Array<Option> = [
  {
    label: "Pendente",
    value: "pending",
  },
  {
    label: "Concluída",
    value: "completed",
  },
];

export const emptyFields: Fields = {
  title: "",
  status: statusOptions[0],
};

export const notLoadedRecord: Task = {
  id: "",
  type: TaskType.commonTask,
  collectionId: "",
  title: "Carregando...",
  isPending: true,
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
        text: `Tarefa`,
        href: useHref(`/tasks/${id}`),
      });
    }
    breadcrumbsItemsList.push({
      text: `${localizedPageTypeName(pageType)} tarefa`,
      href: "#",
    });
  }
  return breadcrumbsItemsList;
};

export function formatStatus(status: string): string {
  return searchLabelByValue(statusOptions, status);
}

export function validateFields(inputValues: Fields): boolean {
  if (inputValues.title && inputValues.status) {
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
          placeholder={`Título da tarefa`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              title: event.detail.value,
            }))
          }
        />
      </FormField>
      <FormField label="Status">
        <Select
          selectedOption={inputValues.status}
          onChange={({ detail }) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              status: detail.selectedOption,
            }))
          }
          options={statusOptions}
          selectedAriaLabel="Selected"
        />
      </FormField>
    </SpaceBetween>
  );
}
