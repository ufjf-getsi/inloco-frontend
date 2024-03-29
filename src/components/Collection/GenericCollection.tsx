import { NavigateFunction, useHref, useParams } from "react-router-dom";
import { Collection, Task, TaskType } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  DatePicker,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../../generic/GenericPages/GenericCreateAndEditPage";
import {
  fetchRecordData,
  localizedPageTypeName,
} from "../../generic/GenericFunctions";
import { PageType } from "../../generic/GenericInterfaces";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";
import { AxiosResponse } from "axios";
import { Item } from "../Task/TableConfig";

export interface Fields {
  title: string;
  startDate: string;
  endDate: string;
}

interface FormFieldsProps {
  inputValues: Fields;
  setInputValues: Function;
}

type ImplementedRecordFormProps = GenericRecordFormProps &
  FormFieldsProps & {
    cancelRedirectLink: string;
    projectId?: string;
  };

export const emptyFields: Fields = {
  title: "",
  startDate: "",
  endDate: "",
};

export const notLoadedRecord: Collection = {
  id: "",
  projectId: "",
  title: "Carregando...",
  startDate: "",
  endDate: "",
  points: [],
  tasks: [],
};

interface BreadcrumbGroupItemsProps {
  projectId?: string;
  pageType: PageType;
}
export const breadcrumpGroupItems = ({
  projectId,
  pageType,
}: BreadcrumbGroupItemsProps) => {
  const { id } = useParams();
  const breadcrumbsItemsList = [
    { text: "Projetos", href: useHref(`/projects`) },
    {
      text: "Projeto",
      href: useHref(
        `/projects${projectId && projectId !== "" ? "/" + projectId : ""}`
      ),
    },
  ];
  if (pageType !== "list") {
    if (pageType === "edit") {
      breadcrumbsItemsList.push({
        text: `Coleta`,
        href: useHref(`/collections/${id}`),
      });
    }
    breadcrumbsItemsList.push({
      text: `${localizedPageTypeName(pageType)} coleta`,
      href: "#",
    });
  }
  return breadcrumbsItemsList;
};

export function fetchTableData({
  navigate,
  setTasksAsItems,
  collectionId,
}: {
  navigate: NavigateFunction;
  setTasksAsItems: Function;
  collectionId: string;
}) {
  fetchRecordData(
    `/collections/${collectionId}/tasks`,
    navigate,
    function (response: AxiosResponse<any, any>) {
      const items: Item[] = [];
      response.data.map((task: Task) => {
        if (task.type === TaskType.commonTask) {
          items.push({
            id: task.id,
            status: task.isPending ? "Pendente" : "Concluída",
            title: task.title,
          });
        }
      });
      setTasksAsItems(items);
    }
  );
}

export function fetchAllRequiredEquipment({
  navigate,
  collectionId,
  setAllRequiredEquipment,
}: {
  navigate: NavigateFunction;
  collectionId: string;
  setAllRequiredEquipment: Function;
}) {
  fetchRecordData(
    `/collections/${collectionId}/required-equipment`,
    navigate,
    function (response: AxiosResponse<any, any>) {
      setAllRequiredEquipment(response.data);
    }
  );
}

export function validateFields(inputValues: Fields): boolean {
  if (inputValues.title) {
    return true;
  } else return false;
}

export function getSendableData({
  parentId,
  inputValues,
}: {
  parentId?: string;
  inputValues: Fields;
}): Collection {
  return {
    id: "",
    projectId: parentId ?? "",
    title: inputValues.title,
    startDate: inputValues.startDate,
    endDate: inputValues.endDate,
    points: [],
    tasks: [],
  };
}

export function RecordForm(props: ImplementedRecordFormProps) {
  const commonAttributes: any = {
    recordCategorySingular: `coleta`,
    recordCategoryPlural: `coletas`,
    recordGenderFeminine: true,
    description: `Uma coleta é uma expedição realizada a fim de obter dados de determinados pontos.`,
    navbarActiveLink: `/projects`,
    breadcrumbs: (
      <GenericBreadcrumbGroup
        items={breadcrumpGroupItems({
          projectId: props.projectId,
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
      <FormField label="Nome">
        <Input
          value={inputValues.title}
          placeholder={`Nome da coleta`}
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              title: event.detail.value,
            }))
          }
        />
      </FormField>
      <SpaceBetween direction="horizontal" size="xl">
        <FormField label="Data de início">
          <DatePicker
            onChange={(event) =>
              setInputValues((prevState: Fields) => ({
                ...prevState,
                startDate: event.detail.value,
              }))
            }
            locale="pt-BR"
            value={inputValues.startDate}
            nextMonthAriaLabel="Next month"
            placeholder="YYYY/MM/DD"
            previousMonthAriaLabel="Previous month"
            todayAriaLabel="Today"
          />
        </FormField>

        <FormField label="Data de fim">
          <DatePicker
            onChange={(event) =>
              setInputValues((prevState: Fields) => ({
                ...prevState,
                endDate: event.detail.value,
              }))
            }
            locale="pt-BR"
            value={inputValues.endDate}
            nextMonthAriaLabel="Next month"
            placeholder="YYYY/MM/DD"
            previousMonthAriaLabel="Previous month"
            todayAriaLabel="Today"
          />
        </FormField>
      </SpaceBetween>
    </SpaceBetween>
  );
}
