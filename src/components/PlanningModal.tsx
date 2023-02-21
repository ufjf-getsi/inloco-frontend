import * as React from "react";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";

interface PlanningModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

export function PlanningModal(props: PlanningModalProps) {
  return (
    <Modal
      onDismiss={() => props.setModalVisible(false)}
      visible={props.modalVisible}
      closeAriaLabel="Close modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button variant="link">Cancelar</Button>
            <Button variant="primary">Confirmar</Button>
          </SpaceBetween>
        </Box>
      }
      header="Planejamento"
    >
      Your description should go here
    </Modal>
  );
}
