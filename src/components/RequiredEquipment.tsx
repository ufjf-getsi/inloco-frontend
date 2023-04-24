import Modal from "@cloudscape-design/components/modal";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import { TextContent } from "@cloudscape-design/components";
import { Equipment } from "../types";

interface RequiredEquipmentProps {
  collectionId: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  equipmentList: Equipment[];
}

export default function RequiredEquipment(props: RequiredEquipmentProps) {
  return (
    <Modal
      onDismiss={() => props.setModalVisible(false)}
      visible={props.modalVisible}
      closeAriaLabel="Fechar modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              onClick={() => {
                props.setModalVisible(false);
              }}
              variant="primary"
            >
              Fechar
            </Button>
          </SpaceBetween>
        </Box>
      }
      header="Equipamentos necessários"
    >
      <TextContent>
        <strong>
          Os seguintes equipamentos são necessários para realizar a coleta:
        </strong>
        <ul>
          {props.equipmentList.map((equipment) => {
            return (
              <li key={equipment.id} className={`list-disc`}>
                {equipment.name}
              </li>
            );
          })}
        </ul>
      </TextContent>
    </Modal>
  );
}
