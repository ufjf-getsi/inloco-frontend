import axios from "axios";
import { Project } from "../../types";

import { FormEvent, useEffect, useState } from "react";

import {
  Form,
  Header,
  SpaceBetween,
  Button,
  FormField,
  Input,
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";

interface FormProps {
  edit: boolean;
}

interface FormConnectionProps extends FormProps {
  project?: Project;
  setAlertVisible: Function;
  setAlertType: Function;
  setAlertText: Function;
}

interface FormConnectionSpecificProps extends FormConnectionProps {
  navigate: Function;
  projectId?: string;
  inputValues: Fields;
  setInputValues: Function;
}

interface FormBodyProps extends FormConnectionSpecificProps {
  handleSubmit: Function;
}

interface Fields {
  title: string;
  description: string;
}

FormHeader.defaultProps = {
  edit: false,
};

FormConnection.defaultProps = {
  edit: false,
};

// Excluir
export function FormHeader({ edit }: FormProps) {
  return (
    <Header
      variant="h1"
      description="Um projeto é uma coleção que guarda registros de todas as coletas realizadas com um propósito em comum."
    >
      {edit ? `Editar` : `Criar`} Projeto
    </Header>
  );
}

export function FormConnection({ project, ...props }: FormConnectionProps) {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    if (project)
      setInputValues({
        title: project.title,
        description: project.description,
      });
  }, [project]);

  if (props.edit && project) {
    return (
      <FormConnectionEdit
        projectId={project.id}
        navigate={navigate}
        inputValues={inputValues}
        setInputValues={setInputValues}
        {...props}
      />
    );
  } else {
    return (
      <FormConnectionCreate
        navigate={navigate}
        inputValues={inputValues}
        setInputValues={setInputValues}
        {...props}
      />
    );
  }
}

export function FormConnectionCreate(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!props.inputValues.title || !props.inputValues.description) {
      return;
    }

    try {
      await axios.post("http://localhost:3333/projects", {
        title: props.inputValues.title,
        description: props.inputValues.description,
      });

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("/"), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText(`Não foi possível criar o projeto! Tente novamente.`);
      props.setAlertVisible(true);
    }
  }

  return <FormBody handleSubmit={handleSubmit} {...props} />;
}

export function FormConnectionEdit(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!props.inputValues.title || !props.inputValues.description) {
      return;
    }

    try {
      await axios.patch(`http://localhost:3333/projects/${props.projectId}`, {
        title: props.inputValues.title,
        description: props.inputValues.description,
      });

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("/"), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText("Não foi possível editar o projeto! Tente novamente.");
      props.setAlertVisible(true);
    }
  }
  return <FormBody handleSubmit={handleSubmit} {...props} />;
}

export function FormBody({
  edit,
  handleSubmit,
  inputValues,
  setInputValues,
}: FormBodyProps) {
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              formAction="none"
              variant="link"
              href={edit ? `./` : `/projects`}
            >
              Cancelar
            </Button>
            <Button variant="primary">
              {edit ? `Editar` : `Criar`} Projeto
            </Button>
          </SpaceBetween>
        }
        errorIconAriaLabel="Erro"
      >
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
      </Form>
    </form>
  );
}
