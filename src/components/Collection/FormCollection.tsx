import axios from "axios";
import { Collection } from "../../types";

import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import {
  Form,
  Header,
  SpaceBetween,
  Button,
  FormField,
  Input,
} from "@cloudscape-design/components";

interface FormProps {
  edit: boolean;
}

interface FormConnectionProps extends FormProps {
  collection?: Collection;
  setAlertVisible: Function;
  setAlertType: Function;
  setAlertText: Function;
}

interface FormConnectionSpecificProps extends FormConnectionProps {
  navigate: Function;
  projectId: string;
  collectionId?: string;
  inputValues: Fields;
  setInputValues: Function;
}

interface FormBodyProps extends FormConnectionSpecificProps {
  handleSubmit: Function;
}

interface Fields {
  title: string;
}

FormHeader.defaultProps = {
  edit: false,
};

FormConnection.defaultProps = {
  edit: false,
};

export function FormHeader({ edit }: FormProps) {
  return (
    <Header
      variant="h1"
      description="Uma coleta é uma expedição realizada a fim de obter dados de determinados pontos."
    >
      {edit ? `Editar` : `Criar`} Coleta
    </Header>
  );
}

export function FormConnection({ collection, ...props }: FormConnectionProps) {
  const navigate = useNavigate();
  let { projectId } = useParams();

  const [inputValues, setInputValues] = useState({
    title: "",
  });

  useEffect(() => {
    if (collection)
      setInputValues({
        title: collection.title,
      });
  }, [collection]);

  if (props.edit && collection) {
    return (
      <FormConnectionEdit
        projectId={projectId ?? ""}
        collectionId={collection.id}
        navigate={navigate}
        inputValues={inputValues}
        setInputValues={setInputValues}
        {...props}
      />
    );
  } else {
    return (
      <FormConnectionCreate
        projectId={projectId ?? ""}
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

    if (!props.inputValues.title) {
      return;
    }

    try {
      await axios.post("http://localhost:3333/collections", {
        title: props.inputValues.title,
        projectId: props.projectId,
      });

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("./..", { replace: true }), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText(`Não foi possível criar a coleta! Tente novamente.`);
      props.setAlertVisible(true);
    }
  }

  return <FormBody handleSubmit={handleSubmit} {...props} />;
}

export function FormConnectionEdit(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!props.inputValues.title) {
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3333/collections/${props.collectionId}`,
        {
          title: props.inputValues.title,
        }
      );

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("./..", { replace: true }), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText("Não foi possível editar a coleta! Tente novamente.");
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
            <Button formAction="none" variant="link" href={`./`}>
              Cancelar
            </Button>
            <Button variant="primary">
              {edit ? `Editar` : `Criar`} Coleta
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
        </SpaceBetween>
      </Form>
    </form>
  );
}
