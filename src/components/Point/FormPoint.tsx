import axios from "axios";
import { Point } from "../../types";

import { FormEvent, useEffect, useState } from "react";

import {
  Form,
  SpaceBetween,
  Button,
  FormField,
  Input,
  Modal,
  Multiselect,
} from "@cloudscape-design/components";

interface FormProps {
  edit: boolean;
  modalVisible: boolean;
}

interface FormConnectionProps extends FormProps {
  point?: Point;
  collectionId: string;
  setAlertVisible: Function;
  updateAlert: Function;
  setModalVisible: Function;
  fetchCollectionData: Function;
  setEditPoint: Function;
  setDeleteModalVisible: Function;
}

interface FormConnectionSpecificProps extends FormConnectionProps {
  pointId?: string;
  inputValues: Fields;
  setInputValues: Function;
  clearInputValues: Function;
  clearModal: Function;
}

interface FormModalProps extends FormConnectionSpecificProps {
  handleSubmit: Function;
}

interface Fields {
  name: string;
  coordinates: string;
}

FormConnection.defaultProps = {
  edit: false,
};

export function FormConnection({ point, ...props }: FormConnectionProps) {
  const [inputValues, setInputValues] = useState({
    name: "",
    coordinates: "",
  });
  function clearInputValues() {
    setInputValues({ name: "", coordinates: "" });
  }
  function clearModal() {
    props.setModalVisible(false);
    props.setEditPoint(false);
    clearInputValues();
  }

  // const [selectedOptions, setSelectedOptions] = useState([]);
  // const [parameters, setParameters] = useState([]);

  useEffect(() => {
    if (point)
      setInputValues({
        name: point.name,
        coordinates: point.coordinates ?? "",
      });
  }, [point]);

  if (props.edit && point) {
    return (
      <FormConnectionEdit
        pointId={point.id}
        inputValues={inputValues}
        setInputValues={setInputValues}
        clearInputValues={clearInputValues}
        clearModal={clearModal}
        {...props}
      />
    );
  } else {
    return (
      <FormConnectionCreate
        inputValues={inputValues}
        setInputValues={setInputValues}
        clearInputValues={clearInputValues}
        clearModal={clearModal}
        {...props}
      />
    );
  }
}

export function FormConnectionCreate(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!props.inputValues.name || !props.inputValues.coordinates) {
      return;
    }

    try {
      await axios.post(`http://localhost:3333/points`, {
        collectionId: props.collectionId,
        name: props.inputValues.name,
        coordinates: props.inputValues.coordinates,
      });
      props.fetchCollectionData();
      props.updateAlert(true, false);
      props.setAlertVisible(true);
      props.clearModal();
    } catch (error) {
      console.log(error);
      props.updateAlert(false, false);
      props.setAlertVisible(true);
    }
  }

  return <FormModal handleSubmit={handleSubmit} {...props} />;
}

export function FormConnectionEdit(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!props.inputValues.name || !props.inputValues.coordinates) {
      return;
    }

    try {
      await axios.patch(`http://localhost:3333/points/${props.pointId}`, {
        name: props.inputValues.name,
        coordinates: props.inputValues.coordinates,
      });
      props.fetchCollectionData();
      props.updateAlert(true, true);
      props.setAlertVisible(true);
      props.clearModal();
    } catch (error) {
      console.log(error);
      props.updateAlert(false, true);
      props.setAlertVisible(true);
    }
  }

  return <FormModal handleSubmit={handleSubmit} {...props} />;
}

export function FormBody(
  {
    edit,
    handleSubmit,
    inputValues,
    setInputValues,
    clearModal,
    setDeleteModalVisible,
    setModalVisible,
    setEditPoint,
    clearInputValues,
  }: FormModalProps,
  { errorText = null }
) {
  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              formAction="none"
              variant="link"
              onClick={() => {
                clearModal();
              }}
            >
              Cancelar
            </Button>
            {edit && (
              <Button
                formAction="none"
                iconName="close"
                onClick={() => {
                  setModalVisible(false);
                  setDeleteModalVisible(true);
                  setEditPoint(false);
                  clearInputValues();
                }}
              >
                Deletar
              </Button>
            )}
            <Button variant="primary">{edit ? `Editar` : `Criar`} ponto</Button>
          </SpaceBetween>
        }
        errorText={errorText}
        errorIconAriaLabel="Erro"
      >
        <SpaceBetween size="l">
          <FormField label="Nome">
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
          <FormField label="Coordenadas">
            <Input
              value={inputValues.coordinates}
              onChange={(event) =>
                setInputValues((prevState: Fields) => ({
                  ...prevState,
                  coordinates: event.detail.value,
                }))
              }
            />
          </FormField>
          {/* <FormField label="Parâmetros">
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
              statusType="loading"
            />
          </FormField> */}
        </SpaceBetween>
      </Form>
    </form>
  );
}

export function FormModal(props: FormModalProps) {
  return (
    <Modal
      onDismiss={() => props.clearModal()}
      visible={props.modalVisible}
      closeAriaLabel="Fechar formulário de criação de ponto."
      header={`${props.edit ? `Editar` : `Criar`} ponto`}
      size={`medium`}
    >
      <FormBody {...props} />
    </Modal>
  );
}
