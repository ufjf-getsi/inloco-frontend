import * as React from "react";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { Point } from "../types";
import { TextContent } from "@cloudscape-design/components";

interface PlanningModalProps {
  points: Point[];
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
      <TextContent>
        <strong>As seguintes tarefas serão adicionadas ao seu registro:</strong>
        <ul>
          {props.points.map((point) =>
            point.measurements.map((measurement) => (
              <li key={measurement.parameter.id}>
                - Pegar equipamento para análise de {measurement.parameter.name}
              </li>
            ))
          )}
        </ul>
      </TextContent>
    </Modal>
  );
}
