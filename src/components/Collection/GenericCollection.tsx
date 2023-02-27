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
          items={[
            { text: "Projetos", href: "/projects" },
            {
              text: "Projeto",
              href: `/projects${
                props.projectId && props.projectId !== ""
                  ? "/" + props.projectId
                  : ""
              }`,
            },
            { text: (props.edit ? `Editar` : `Criar`) + " coleta", href: "#" },
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
    </SpaceBetween>
  );
}
