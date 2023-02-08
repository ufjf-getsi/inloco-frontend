import axios from "axios";
import { Equipment } from "../../types";

import { FormEvent, useEffect, useState } from "react";

import {
  Form,
  Header,
  SpaceBetween,
  Button,
  FormField,
  Input,
  // Multiselect,
  // SelectProps,
} from "@cloudscape-design/components";
import { useNavigate } from "react-router-dom";

interface FormProps {
  edit: boolean;
}

interface FormConnectionProps extends FormProps {
  equipment?: Equipment;
  setAlertVisible: Function;
  updateAlert: Function;
}

interface FormConnectionSpecificProps extends FormConnectionProps {
  navigate: Function;
  equipmentId?: string;
  inputValues: Fields;
  setInputValues: Function;
}

interface FormBodyProps extends FormConnectionSpecificProps {
  handleSubmit: Function;
}

interface Fields {
  name: string;
  // selectedOptions: SelectProps.Options;
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
      description="Equipamentos disponíveis para as aferições no campo."
    >
      {edit ? `Editar` : `Criar`} Equipamento
    </Header>
  );
}

export function FormConnection({ equipment, ...props }: FormConnectionProps) {
  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState<Fields>({
    name: "",
    // selectedOptions: [],
  });

  useEffect(() => {
    if (equipment)
      setInputValues({
        name: equipment.name,
        // id: equipment.id,
      });
  }, [equipment]);

  if (props.edit && equipment) {
    return (
      <FormConnectionEdit
        equipmentId={equipment.id}
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

    if (!props.inputValues.name) {
      return;
    }

    try {
      await axios.post("http://localhost:3333/equipment", {
        name: props.inputValues.name,
        // id: props.inputValues.id,
      });
      props.updateAlert(true);
      props.setAlertVisible(true);
      setTimeout(() => props.navigate("/equipment"), 1000);
    } catch (error) {
      console.log(error);
      props.updateAlert(false);
      props.setAlertVisible(true);
    }
  }

  return <FormBody handleSubmit={handleSubmit} {...props} />;
}

export function FormConnectionEdit(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!props.inputValues.name) {
      return;
    }

    try {
      await axios.patch(
        `http://localhost:3333/equipment/${props.equipmentId}`,
        {
          name: props.inputValues.name,
          // id: props.inputValues.id,
        }
      );
      props.updateAlert(true);
      props.setAlertVisible(true);
      setTimeout(() => props.navigate("./.."), 1000);
    } catch (error) {
      console.log(error);
      props.updateAlert(false);
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
  // interface Option {
  //   value: string;
  //   label: string;
  // }
  // const [parameters, setParameters] = useState<Option[]>([]);

  // useEffect(() => {
  //   axios
  //     .get<Parameter[]>("http://localhost:3333/parameters")
  //     .then((response) => {
  //       setParameters(
  //         response.data.map((item) => ({ value: item.name, label: item.name }))
  //       );
  //     });
  // }, []);

  // const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              formAction="none"
              variant="link"
              href={edit ? `./` : `/equipment`}
            >
              Cancelar
            </Button>
            <Button variant="primary">
              {edit ? `Editar` : `Criar`} Equipamento
            </Button>
          </SpaceBetween>
        }
        errorIconAriaLabel="Erro"
      >
        <SpaceBetween size="l">
          <FormField label="Equipamento">
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
          {/* <FormField label="Parâmetro(s) medido(s)">
            <Multiselect
              selectedOptions={selectedOptions}
              onChange={({ detail }) =>
                setSelectedOptions(detail.selectedOptions)
              }
              deselectAriaLabel={(e) => `Remove ${e.label}`}
              options={parameters}
              loadingText="Carregando parâmetros"
              placeholder="Selecione os parâmetros"
              selectedAriaLabel="Selecionado"
              statusType={
                parameters
                  ? parameters.length > 0
                    ? "finished"
                    : "loading"
                  : "error"
              }
            />
          </FormField> */}
        </SpaceBetween>
      </Form>
    </form>
  );
}
