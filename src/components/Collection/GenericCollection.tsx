import { useHref, useParams } from "react-router-dom";
import { Collection } from "../../types";

import {
  SpaceBetween,
  FormField,
  Input,
  BreadcrumbGroup,
  DatePicker,
} from "@cloudscape-design/components";
import GenericCreateAndEditPage, {
  GenericRecordFormProps,
} from "../Generic/GenericPages/GenericCreateAndEditPage";
import { localizedPageTypeName } from "../Generic/GenericFunctions";
import { PageType } from "../Generic/GenericInterfaces";

export interface Fields {
  title: string;
  startDate: string;
  endDate: string;
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
  collectionId?: string;
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
      href: useHref(`/projects${projectId && projectId !== "" ?
        "/" + projectId : ""}`),
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

      <FormField label="Data de início">
        <DatePicker
          onChange={(event) =>
            setInputValues((prevState: Fields) => ({
              ...prevState,
              startDate: event.detail.value,
            }))
          }
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
          value={inputValues.endDate}
          nextMonthAriaLabel="Next month"
          placeholder="YYYY/MM/DD"
          previousMonthAriaLabel="Previous month"
          todayAriaLabel="Today"
        />
      </FormField>
    </SpaceBetween>
  );
}
