import axios from "axios";
import { Project } from "../types";

import { useNavigate } from "react-router-dom";
import { FormEvent } from "react";

import {
  Form,
  Header,
  SpaceBetween,
  Button,
  FormField,
  Input,
} from "@cloudscape-design/components";

interface FormProps {
  project: Project;
  setProject: Function;
  setAlertVisible: Function;
  setAlertType: Function;
  setAlertText: Function;
}

export function FormHeader() {
  return (
    <Header
      variant="h1"
      description="Um projeto é uma coleção que guarda registros de todas as coletas realizadas com um propósito em comum."
    >
      Editar projeto
    </Header>
  );
}

export function FormContent(props: FormProps, { errorText = null }) {
  const navigate = useNavigate();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!props.project.title || !props.project.description) {
      return;
    }

    try {
      // await axios.post("http://localhost:3333/projects", {
      //   title: props.project.title,
      //   description: props.project.description,
      // });

      props.setAlertVisible(true);

      setTimeout(() => navigate("/", { replace: true }), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText("Não foi possível editar o projeto! Tente novamente.");
      props.setAlertVisible(true);
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link" href="/">
              Cancelar
            </Button>
            <Button variant="primary">Editar projeto</Button>
          </SpaceBetween>
        }
        errorText={errorText}
        errorIconAriaLabel="Erro"
      >
        <SpaceBetween size="l">
          <FormField label="Nome">
            <Input
              value={props.project.title}
              onChange={(event) =>
                props.setProject((prevState: Project) => ({
                  ...prevState,
                  title: event.detail.value,
                }))
              }
            />
          </FormField>
          <FormField label="Descrição">
            <Input
              value={props.project.description}
              onChange={(event) =>
                props.setProject((prevState: Project) => ({
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
