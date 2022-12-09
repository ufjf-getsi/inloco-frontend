import axios from "axios";

import {
  SpaceBetween,
  Button,
  Modal,
  Box,
  Alert,
} from "@cloudscape-design/components";

interface DeleteCollectionModalProps {
  collectionId: string;
  collectionTitle: String;
  projectId: string;
  visible: boolean;
  setVisible: Function;
}

export function DeleteCollectionModal(props: DeleteCollectionModalProps) {
  function deleteCollection(id: string) {
    axios.delete(`http://localhost:3333/collections/${id}`);
  }

  return (
    <Modal
      onDismiss={() => props.setVisible(false)}
      visible={props.visible}
      closeAriaLabel="Fechar modal de deleção da coleta."
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link" onClick={() => props.setVisible(false)}>
              Cancelar
            </Button>
            <Button
              variant="primary"
              onClick={() => deleteCollection(props.collectionId)}
              href="./.."
            >
              Excluir
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Exclusão de coleta"
    >
      <p className="mb-2">
        Deseja excluir a coleta <b>{props.collectionTitle}</b> permanentemente?
        Esta operação não pode ser revertida.
      </p>
      <Alert>
        Proceder com esta ação deletará a coleta com todo o seu conteúdo,
        incluindo todos os pontos e registros associados a ela.
      </Alert>
    </Modal>
  );
}
