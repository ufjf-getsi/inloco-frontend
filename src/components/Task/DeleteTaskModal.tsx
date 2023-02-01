import axios from "axios";

import {
  SpaceBetween,
  Button,
  Modal,
  Box,
  Alert,
} from "@cloudscape-design/components";

interface DeleteTaskModalProps {
  taskId: string;
  visible: boolean;
  setVisible: Function;
  taskTitle: String;
}

export function DeleteTaskModal(props: DeleteTaskModalProps) {
  function deleteTask(id: string) {
    axios.delete(`http://localhost:3333/tasks/${id}`);
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
              onClick={() => deleteTask(props.taskId)}
              href="/"
            >
              Excluir
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Exclusão de tarefa"
    >
      <p className="mb-2">
        Deseja excluir a tarefa <b>{props.taskTitle}</b> permanentemente? Esta
        operação não pode ser revertida.
      </p>
      <Alert>
        Proceder com esta ação deletará a tarefa com todo o seu conteúdo.
      </Alert>
    </Modal>
  );
}
