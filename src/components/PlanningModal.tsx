import * as React from "react";
import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { Point } from "../types";
import { TextContent } from "@cloudscape-design/components";
import axios from "axios";

interface PlanningModalProps {
  collectionId: string;
  points: Point[];
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

async function handleClick(props: PlanningModalProps) {
  for (const point of props.points) {
    for (const measurement of point.measurements) {
      await axios.post("http://localhost:3333/tasks", {
        title: `Pegar equipamento para análise de ${measurement.parameter.name}`,
        url: "url",
        collectionId: props.collectionId,
      });
    }
  }
}

export default function PlanningModal(props: PlanningModalProps) {
  return (
    <Modal
      onDismiss={() => props.setModalVisible(false)}
      visible={props.modalVisible}
      closeAriaLabel="Close modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              onClick={() => {
                props.setModalVisible(false);
              }}
              variant="link"
            >
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleClick(props);
                props.setModalVisible(false);
              }}
              variant="primary"
            >
              Confirmar
            </Button>
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
