import axios from "axios";

import { FormEvent, useState } from "react";

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
      Criar projeto
    </Header>
  );
}

export function FormContent(props: FormProps, { errorText = null }) {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    title: "",
    description: "",
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!inputValues.title || !inputValues.description) {
      return;
    }

    try {
      await axios.post("http://localhost:3333/projects", {
        title: inputValues.title,
        description: inputValues.description,
      });

      props.setAlertVisible(true);

      setTimeout(() => navigate("/", { replace: true }), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText("Não foi possível criar o projeto! Tente novamente.");
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
            <Button variant="primary">Criar projeto</Button>
          </SpaceBetween>
        }
        errorText={errorText}
        errorIconAriaLabel="Erro"
      >
        <SpaceBetween size="l">
          <FormField label="Nome">
            <Input
              value={inputValues.title}
              onChange={(event) =>
                setInputValues((prevState) => ({
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
                setInputValues((prevState) => ({
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
