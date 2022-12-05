import axios from "axios";

import { FormEvent, useState } from "react";

import {
  Form,
  SpaceBetween,
  Button,
  FormField,
  Input,
  Modal,
  Multiselect,
} from "@cloudscape-design/components";

interface FormProps extends FormContentProps {
  createPointModalVisible: boolean;
}

interface FormContentProps {
  collectionId: string;
  setAlertVisible: Function;
  setAlertType: Function;
  setAlertText: Function;
  setCreatePointModalVisible: Function;
  fetchCollectionData: Function;
}

export function CreatePointForm(props: FormProps) {
  return (
    <Modal
      onDismiss={() => props.setCreatePointModalVisible(false)}
      visible={props.createPointModalVisible}
      closeAriaLabel="Fechar formulário de criação de ponto."
      header="Adicionar ponto"
      size={`medium`}
    >
      <FormContent
        collectionId={props.collectionId}
        setAlertVisible={props.setAlertVisible}
        setAlertType={props.setAlertType}
        setAlertText={props.setAlertText}
        setCreatePointModalVisible={props.setCreatePointModalVisible}
        fetchCollectionData={props.fetchCollectionData}
      />
    </Modal>
  );
}

export function FormContent(props: FormContentProps, { errorText = null }) {
  const [inputValues, setInputValues] = useState({
    coordinates: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [parameters, setParameters] = useState([]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!inputValues.coordinates) {
      return;
    }
    try {
      await axios.post(
        `http://localhost:3333/collections/${props.collectionId}`,
        {
          coordinates: inputValues.coordinates,
        }
      );
      props.fetchCollectionData();
    } catch (error) {
      console.log(error);
      props.setAlertType("error");
      props.setAlertText(
        "Não foi possível adicionar o ponto! Tente novamente."
      );
    } finally {
      props.setCreatePointModalVisible(false);
      props.setAlertVisible(true);
    }
  }

  return (
    <form onSubmit={(event) => handleSubmit(event)}>
      <Form
        actions={
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              formAction="none"
              variant="link"
              onClick={() => {
                props.setCreatePointModalVisible(false);
              }}
            >
              Cancelar
            </Button>
            <Button variant="primary">Adicionar ponto</Button>
          </SpaceBetween>
        }
        errorText={errorText}
        errorIconAriaLabel="Erro"
      >
        <SpaceBetween size="l">
          <FormField label="Coordenadas">
            <Input
              value={inputValues.coordinates}
              onChange={(event) =>
                setInputValues((prevState) => ({
                  ...prevState,
                  coordinates: event.detail.value,
                }))
              }
            />
          </FormField>
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
        </SpaceBetween>
      </Form>
    </form>
  );
}
