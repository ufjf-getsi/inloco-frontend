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
  Select,
  SelectProps,
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

interface Option {
  label: string;
  value: string;
}

interface Fields {
  name: string;
  unit: string;
  dataType: Option;
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

const options: Array<Option> = [
  {
    label: "Real",
    value: "real",
  },
  {
    label: "Inteiro",
    value: "integer",
  },
  {
    label: "Texto",
    value: "text",
  },
];

export function formatDataType(dataType: string): string {
  return (
    options.find((option) => {
      return option.value === dataType;
    })?.label ?? dataType
  );
}

export function FormConnection({ parameter, ...props }: FormConnectionProps) {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState<Fields>({
    name: "",
    unit: "",
    dataType: options[0],
  });

  useEffect(() => {
    if (parameter)
      setInputValues({
        name: parameter.name,
        unit: parameter.unit,
        dataType: {
          label: formatDataType(parameter.dataType),
          value: parameter.dataType,
        },
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

function FormConnectionCreate(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!(props.inputValues.name && props.inputValues.dataType.value)) {
      return;
    }

    try {
      await axios.post("http://localhost:3333/parameters", {
        name: props.inputValues.name,
        unit: props.inputValues.unit === "" ? "N/A" : props.inputValues.unit,
        dataType: props.inputValues.dataType.value,
      });

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("/parameters"), 1000);
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

function FormConnectionEdit(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!(props.inputValues.name && props.inputValues.dataType.value)) {
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3333/parameters/${props.parameterId}`,
        {
          name: props.inputValues.name,
          unit: props.inputValues.unit === "" ? "N/A" : props.inputValues.unit,
          dataType: props.inputValues.dataType.value,
        }
      );

      props.setAlertVisible(true);

      setTimeout(() => props.navigate("./.."), 1000);
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

function FormBody({
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
              placeholder={`Nome do parâmetro`}
              onChange={(event) =>
                setInputValues((prevState: Fields) => ({
                  ...prevState,
                  name: event.detail.value,
                }))
              }
            />
          </FormField>
          <FormField label="Unidade">
            <Input
              value={inputValues.unit}
              placeholder={`N/A`}
              onChange={(event) =>
                setInputValues((prevState: Fields) => ({
                  ...prevState,
                  unit: event.detail.value,
                }))
              }
            />
          </FormField>
          <FormField label="Medida">
            <Select
              selectedOption={inputValues.dataType}
              onChange={({ detail }) =>
                setInputValues((prevState: Fields) => ({
                  ...prevState,
                  dataType: detail.selectedOption,
                }))
              }
              options={options}
              selectedAriaLabel="Selected"
            />
          </FormField>
        </SpaceBetween>
      </Form>
    </form>
  );
}
