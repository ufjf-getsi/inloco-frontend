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
import { useNavigate, useParams } from "react-router-dom";

interface FormProps {
  setAlertVisible: Function;
  setAlertType: Function;
  setAlertText: Function;
}

export function FormHeader() {
  return (
    <Header
      variant="h1"
      description="Uma coleta é uma expedição realizada a fim de obter dados de determinados pontos."
    >
      Criar coleta
    </Header>
  );
}

export function FormContent(props: FormProps, { errorText = null }) {
  const navigate = useNavigate();

  let { projectId } = useParams();

  const [inputValues, setInputValues] = useState({
    title: "",
  });

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!inputValues.title) {
      return;
    }

    try {
      await axios.post(
        `http://localhost:3333/projects/${projectId}/collections`,
        {
          title: inputValues.title,
        }
      );

      props.setAlertVisible(true);

      setTimeout(() => navigate("./..", { replace: true }), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText("Não foi possível criar a coleta! Tente novamente.");
      props.setAlertVisible(true);
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button formAction="none" variant="link" href="./">
              Cancelar
            </Button>
            <Button variant="primary">Criar coleta</Button>
          </SpaceBetween>
        }
        errorText={errorText}
        errorIconAriaLabel="Erro"
      >
        <SpaceBetween size="l">
          <FormField label="Título">
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
        </SpaceBetween>
      </Form>
    </form>
  );
}
