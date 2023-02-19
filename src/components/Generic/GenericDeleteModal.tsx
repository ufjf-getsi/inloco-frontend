import axios from "axios";

import {
  SpaceBetween,
  Button,
  Modal,
  Box,
  Alert,
} from "@cloudscape-design/components";

export interface GenericDeleteModalProps {
  visible: boolean;
  setVisible: Function;
  recordCategory: string;
  recordName: string;
  recordGenderFeminine: boolean;
  questionText?: string;
  alertText?: string;
  serverDeleteLink: string;
  afterDeleteRedirectLink: string;
}

export default function GenericDeleteModal(props: GenericDeleteModalProps) {
  function deleteRecord() {
    axios.delete(props.serverDeleteLink);
  }

  const recordGenderArticle = props.recordGenderFeminine ? "a" : "o";

  const genericQuestionText = (
    <span>
      Deseja excluir {recordGenderArticle} {props.recordCategory}
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
              href={props.afterDeleteRedirectLink}
            >
              Excluir
            </Button>
          </SpaceBetween>
        </Box>
      }
      header={`Exclusão de ${props.recordCategory}`}
    >
      <p className="mb-2">
        {props.questionText ? props.questionText : genericQuestionText}
      </p>
      <Alert>
        {props.alertText
          ? props.alertText
          : `Proceder com esta ação deletará ${recordGenderArticle} ${props.recordCategory} com todo o seu conteúdo,
        incluindo todos os registros associados a si.`}
      </Alert>
    </Modal>
  );
}
