import axios from "axios";
import { Parameter } from "../../types";

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
  parameter?: Parameter;
  setAlertVisible: Function;
  setAlertType: Function;
  setAlertText: Function;
}

interface FormConnectionSpecificProps extends FormConnectionProps {
  navigate: Function;
  parameterId?: string;
  inputValues: Fields;
  setInputValues: Function;
}

interface FormBodyProps extends FormConnectionSpecificProps {
  handleSubmit: Function;
}

interface Fields {
  name: string;
  dataType: string;
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
      description="Um parâmetro é uma coleção que guarda registros de todas as coletas realizadas com um propósito em comum."
    >
      {edit ? `Editar` : `Criar`} Parâmetro
    </Header>
  );
}

export function FormConnection({ parameter, ...props }: FormConnectionProps) {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState({
    name: "",
    dataType: "",
  });

  useEffect(() => {
    if (parameter)
      setInputValues({
        name: parameter.name,
        dataType: parameter.dataType,
      });
  }, [parameter]);

  if (props.edit && parameter) {
    return (
      <FormConnectionEdit
        parameterId={parameter.id}
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

    if (!props.inputValues.name || !props.inputValues.dataType) {
      return;
    }

    try {
      await axios.post("http://localhost:3333/parameters", {
        name: props.inputValues.name,
        dataType: props.inputValues.dataType,
      });

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("/parameters", { replace: true }), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText(
        `Não foi possível criar o parâmetro! Tente novamente.`
      );
      props.setAlertVisible(true);
    }
  }

  return <FormBody handleSubmit={handleSubmit} {...props} />;
}

export function FormConnectionEdit(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!props.inputValues.name || !props.inputValues.dataType) {
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3333/parameters/${props.parameterId}`,
        {
          name: props.inputValues.name,
          dataType: props.inputValues.dataType,
        }
      );

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("./..", { replace: true }), 1000);
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText(
        "Não foi possível editar o parâmetro! Tente novamente."
      );
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
              href={edit ? `./` : `/parameters`}
            >
              Cancelar
            </Button>
            <Button variant="primary">
              {edit ? `Editar` : `Criar`} Parâmetro
            </Button>
          </SpaceBetween>
        }
        errorIconAriaLabel="Erro"
      >
        <SpaceBetween size="l">
          <FormField label="Parâmetro">
            <Input
              value={inputValues.name}
              onChange={(event) =>
                setInputValues((prevState: Fields) => ({
                  ...prevState,
                  name: event.detail.value,
                }))
              }
            />
          </FormField>
          <FormField label="Medida">
            <Input
              value={inputValues.dataType}
              onChange={(event) =>
                setInputValues((prevState: Fields) => ({
                  ...prevState,
                  dataType: event.detail.value,
                }))
              }
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </form>
  );
}
