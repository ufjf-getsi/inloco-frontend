import axios from "axios";
import { Point } from "../../types";

import {
  SpaceBetween,
  Button,
  Modal,
  Box,
  Alert,
} from "@cloudscape-design/components";

interface DeletePointModalProps {
  point: Point;
  visible: boolean;
  setVisible: Function;
  fetchCollectionData: Function;
}

export function DeletePointModal(props: DeletePointModalProps) {
  function deletePoint(id: string) {
    axios.delete(`http://localhost:3333/points/${id}`);
    props.setVisible(false);
    props.fetchCollectionData();
  }

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
              onClick={() => deletePoint(props.point.id)}
            >
              Excluir
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Exclusão de ponto"
    >
      <p className="mb-2">
        Deseja excluir o ponto <b>{props.point.name}</b> permanentemente? Esta
        operação não pode ser revertida.
      </p>
      <Alert>
        Proceder com esta ação deletará o ponto e todas as informações
        associadas a si.
      </Alert>
    </Modal>
  );
}
