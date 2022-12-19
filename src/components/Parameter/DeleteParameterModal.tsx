import axios from "axios";

import {
  SpaceBetween,
  Button,
  Modal,
  Box,
  Alert,
} from "@cloudscape-design/components";

interface DeleteParameterModalProps {
  parameterId: string;
  visible: boolean;
  setVisible: Function;
  parameterName: String;
}

export function DeleteParameterModal(props: DeleteParameterModalProps) {
  function deleteParameter(id: string) {
    axios.delete(`http://localhost:3333/parameters/${id}`);
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
              onClick={() => deleteParameter(props.parameterId)}
              href="/parameters"
            >
              Excluir
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Exclusão de parâmetro"
    >
      <p className="mb-2">
        Deseja excluir o parâmetro <b>{props.parameterName}</b> permanentemente?
        Esta operação não pode ser revertida.
      </p>
      <Alert>
        Proceder com esta ação deletará o parâmetro, removendo-o de todas as
        coletas às quais está associado.
      </Alert>
    </Modal>
  );
}
