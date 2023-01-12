import axios from "axios";

import {
  SpaceBetween,
  Button,
  Modal,
  Box,
  Alert,
} from "@cloudscape-design/components";

interface DeleteEquipmentModalProps {
  equipmentId: string;
  visible: boolean;
  setVisible: Function;
  equipmentName: String;
}

export function DeleteEquipmentModal(props: DeleteEquipmentModalProps) {
  function deleteEquipment(id: string) {
    axios.delete(`http://localhost:3333/equipment/${id}`);
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
              onClick={() => deleteEquipment(props.equipmentId)}
              href="/equipment"
            >
              Excluir
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Exclusão de equipamento"
    >
      <p className="mb-2">
        Deseja excluir o equipamento <b>{props.equipmentName}</b>{" "}
        permanentemente? Esta operação não pode ser revertida.
      </p>
      <Alert>
        Proceder com esta ação deletará o equipamento, removendo-o de todas as
        coletas às quais está associado.
      </Alert>
    </Modal>
  );
}
