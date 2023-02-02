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
  point?: Point;
  modalVisible: boolean;
}

interface FormConnectionProps extends FormProps {
  collectionId: string;
  fetchCollectionData: Function;
  updateAlert: Function;
  setAlertVisible: Function;
  setModalVisible: Function;
  setDeleteModalVisible: Function;
}

interface FormConnectionSpecificProps extends FormConnectionProps {
  inputValues: Fields;
  setInputValues: Function;
  clearInputValues: Function;
  closeModal: Function;
}

interface FormModalProps extends FormConnectionSpecificProps {
  handleSubmit: Function;
  edit: boolean;
}

interface Fields {
  name: string;
  coordinates: string;
}

export function FormConnection({ ...props }: FormConnectionProps) {
  const [inputValues, setInputValues] = useState({
    name: "",
    coordinates: "",
  });

  function clearInputValues() {
    setInputValues({ name: "", coordinates: "" });
  }

  function closeModal() {
    props.setModalVisible(false);
  }

  // const [selectedOptions, setSelectedOptions] = useState([]);
  // const [parameters, setParameters] = useState([]);

  useEffect(() => {
    if (props.point)
      setInputValues({
        name: props.point.name,
        coordinates: props.point.coordinates ?? "",
      });
      else{
        clearInputValues();
      }
  }, [props.point]);

  if (props.point) {
    return (
      <FormConnectionEdit
        inputValues={inputValues}
        setInputValues={setInputValues}
        clearInputValues={clearInputValues}
        closeModal={closeModal}
        {...props}
      />
    );
  } else {
    return (
      <FormConnectionCreate
        inputValues={inputValues}
        setInputValues={setInputValues}
        clearInputValues={clearInputValues}
        closeModal={closeModal}
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
      props.closeModal();
      props.clearInputValues();
    } catch (error) {
      console.log(error);
      props.updateAlert(false, false);
      props.setAlertVisible(true);
    }
  }

  return <FormModal handleSubmit={handleSubmit} edit={false} {...props} />;
}

export function FormConnectionEdit(props: FormConnectionSpecificProps) {
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!props.inputValues.name || !props.inputValues.coordinates) {
      return;
    }

console.log(props.point);

    try {
      await axios.patch(`http://localhost:3333/points/${props.point?.id}`, {
        name: props.inputValues.name,
        coordinates: props.inputValues.coordinates,
      });
      props.fetchCollectionData();
      props.updateAlert(true, true);
      props.setAlertVisible(true);
      props.closeModal();
    } catch (error) {
      console.log(error);
      props.updateAlert(false, true);
      props.setAlertVisible(true);
    }
  }

  return <FormModal handleSubmit={handleSubmit} edit={true} {...props} />;
}

export function FormModal(props: FormModalProps) {
  return (
    <Modal
      onDismiss={() => props.closeModal()}
      visible={props.modalVisible}
      closeAriaLabel="Fechar formulário de criação de ponto."
      header={`${props.edit ? `Editar` : `Criar`} ponto`}
      size={`medium`}
    >
      <FormBody {...props} />
    </Modal>
  );
}

function FormBody(
  {
    handleSubmit,
    inputValues,
    setInputValues,
    closeModal,
    setDeleteModalVisible,
    setModalVisible,
    clearInputValues,
    edit,
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
                closeModal();
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
