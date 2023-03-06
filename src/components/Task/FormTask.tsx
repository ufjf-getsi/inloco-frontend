import axios from "axios";
import { Task } from "../../types";

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
  task?: Task;
  setAlertVisible: Function;
  setAlertType: Function;
  setAlertText: Function;
}

interface FormConnectionSpecificProps extends FormConnectionProps {
  navigate: Function;
  taskId?: string;
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
      description="Registre uma tarefa que deve ser realizada."
    >
      {edit ? `Editar` : `Criar`} Tarefa
    </Header>
  );
}

export function FormConnection({ task, ...props }: FormConnectionProps) {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    title: "",
  });

  useEffect(() => {
    if (task)
      setInputValues({
        title: task.title,
      });
  }, [task]);

  if (props.edit && task) {
    return (
      <FormConnectionEdit
        taskId={task.id}
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

    if (!props.inputValues.title) {
      return;
    }

    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/tasks`, {
        title: props.inputValues.title,
      });

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("/"), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText(`Não foi possível criar a tarefa! Tente novamente.`);
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
        `${import.meta.env.VITE_SERVER_URL}/tasks/${props.taskId}`,
        {
          title: props.inputValues.title,
        }
      );

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("/"), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText("Não foi possível editar a tarefa! Tente novamente.");
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
              href={edit ? `./` : `/tasks`}
            >
              Cancelar
            </Button>
            <Button variant="primary">
              {edit ? `Editar` : `Criar`} Tarefa
            </Button>
          </SpaceBetween>
        }
        errorIconAriaLabel="Erro"
      >
        <SpaceBetween size="l">
          <FormField label="Título">
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
