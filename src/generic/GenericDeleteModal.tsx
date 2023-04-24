import axios from "axios";

import {
  SpaceBetween,
  Button,
  Modal,
  Box,
  Alert,
} from "@cloudscape-design/components";
import { GenericRecordProps } from "./GenericInterfaces";
import { useHref } from "react-router-dom";

export interface GenericDeleteModalProps extends GenericRecordProps {
  visible: boolean;
  setVisible: Function;
  questionText?: string;
  alertText?: string;
  serverDeleteLink: string;
  afterDeleteRedirectLink: string;
}

export default function GenericDeleteModal(props: GenericDeleteModalProps) {
  function deleteRecord() {
    axios.delete(import.meta.env.VITE_SERVER_URL + props.serverDeleteLink);
  }

  const recordGenderArticle = props.recordGenderFeminine ? "a" : "o";

  const genericQuestionText = (
    <span>
      Deseja excluir {recordGenderArticle} {props.recordCategorySingular}
      <b> {props.recordName}</b> permanentemente? Esta operação não pode ser
      revertida.
    </span>
  );

  return (
    <Modal
      onDismiss={() => props.setVisible(false)}
      visible={props.visible}
      closeAriaLabel="Fechar modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => props.setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => deleteRecord()}
              href={useHref(props.afterDeleteRedirectLink)}
            >
              Excluir
            </Button>
          </SpaceBetween>
        </Box>
      }
      header={`Exclusão de ${props.recordCategorySingular}`}
    >
      <p className="mb-2">
        {props.questionText ? props.questionText : genericQuestionText}
      </p>
      <Alert>
        {props.alertText
          ? props.alertText
          : `Proceder com esta ação deletará ${recordGenderArticle} ${props.recordCategorySingular} com todo o seu conteúdo,
        incluindo todos os registros associados a si.`}
      </Alert>
    </Modal>
  );
}
