import { useState } from "react";

import {
  SpaceBetween,
  Button,
  Modal,
  Box,
  Alert,
} from "@cloudscape-design/components";

interface DeleteProjectModalProps {
  visible: boolean;
  setVisible: Function;
  projectTitle: String;
}

export function DeleteProjectModal(props: DeleteProjectModalProps) {
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
            <Button variant="primary">Excluir</Button>
          </SpaceBetween>
        </Box>
      }
      header="Exclusão de projeto"
    >
      <p className="mb-2">
        Deseja excluir o projeto <b>{props.projectTitle}</b> permanentemente?
        Esta operação não pode ser revertida.
      </p>
      <Alert>
        Proceder com esta ação deletará o projeto com todo o seu conteúdo,
        incluindo todas as coletas e registros associados a ele.
      </Alert>
    </Modal>
  );
}
