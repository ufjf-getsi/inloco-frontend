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
} from "../../generic/GenericPages/GenericCreateAndEditPage";
import {
  localizedPageTypeName,
  searchLabelByValue,
} from "../../generic/GenericFunctions";
import {
  PageType,
  OptionStringString as Option,
} from "../../generic/GenericInterfaces";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";
import { notLoadedRecord as notLoadedCollection } from "../Collection/GenericCollection";

export interface Fields {
  title: string;
  status: Option;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
}

type ImplementedRecordFormProps = GenericRecordFormProps &
  FormFieldsProps & {
    cancelRedirectLink: string;
    projectId?: string;
    collectionId?: string;
  };

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
  title: "Carregando...",
  isPending: true,
  orderOnCollection: 0,
  collection: notLoadedCollection,
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

export function formatTitle(task: Task) {
  let formattedTitle = "Tarefa";
  if (task.type === TaskType.commonTask) {
    formattedTitle = task.title;
  } else if (task.type === TaskType.equipmentTask) {
    formattedTitle = `${task.isBringingBack ? "Trazer" : "Levar"} ${
      task.equipment.name ?? task.equipment.id
    }`;
  }
  return formattedTitle;
}

export function formatStatus(status: string): string {
  return searchLabelByValue(statusOptions, status);
}

export function validateFields(inputValues: Fields): boolean {
  if (inputValues.title && inputValues.status) {
    return true;
  } else return false;
}

export function formattedFields(record: Task): Fields {
  return {
    title: formatTitle(record),
    status: {
      label: formatStatus(record.isPending ? "pending" : "completed"),
      value: record.isPending ? "pending" : "completed",
    },
  };
}

export function getSendableData({
  parentId,
  inputValues,
}: {
  parentId?: string;
  inputValues: Fields;
}): Task {
  return {
    type: TaskType.commonTask,
    id: "",
    title: inputValues.title,
    isPending: inputValues.status.value === "completed" ? false : true,
    orderOnCollection: 0,
    collection: { ...notLoadedCollection, id: parentId ?? "" },
  };
}

export function RecordForm(props: ImplementedRecordFormProps) {
  const commonAttributes: any = {
    recordCategorySingular: `tarefa`,
    recordCategoryPlural: `tarefas`,
    recordGenderFeminine: true,
    description: `Tarefas incluem equipamentos necessários, parâmetros a aferir, e outras atividades.`,
    navbarActiveLink: `/projects`,
    breadcrumbs: (
      <GenericBreadcrumbGroup
        items={breadcrumpGroupItems({
          projectId: props.projectId,
          collectionId: props.collectionId,
          pageType: props.edit ? "edit" : "create",
        })}
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
