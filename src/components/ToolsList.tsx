import { useState } from "react";
import Table from "@cloudscape-design/components/table";

import {
  SpaceBetween,
  Button,
  Modal,
  Box,
} from "@cloudscape-design/components";

import { Equipment } from "../types";

interface ModalProps {
  toolsModalVisible: boolean;
  setToolsModalVisible: Function;
}

export function ToolsList(props: ModalProps) {
  const [selectedItems, setSelectedItems] = useState([{}]);

  return (
    <Modal
      onDismiss={() => props.setToolsModalVisible(false)}
      visible={props.toolsModalVisible}
      closeAriaLabel="Fechar modal"
      footer={
        <Box float="right">
          <SpaceBetween direction="horizontal" size="xs">
            <Button
              variant="link"
              onClick={() => props.setToolsModalVisible(false)}
            >
              Cancelar
            </Button>
            <Button variant="primary">Confirmar</Button>
          </SpaceBetween>
        </Box>
      }
      header="Lista de equipamentos"
    >
      <Table
        onSelectionChange={({ detail }) =>
          setSelectedItems(detail.selectedItems)
        }
        selectedItems={selectedItems}
        ariaLabels={{
          selectionGroupLabel: "Items selection",
          allItemsSelectionLabel: ({ selectedItems }) =>
            `${selectedItems.length} ${
              selectedItems.length === 1 ? "item" : "items"
            } selected`,
          itemSelectionLabel: ({ selectedItems }, item) => {
            const isItemSelected = selectedItems.filter(
              (i) => i.name === item.name
            ).length;
            return `${item.name} is ${isItemSelected ? "" : "not"} selected`;
          },
        }}
        columnDefinitions={[
          {
            id: "name",
            header: "Item",
            cell: (e: any) => e.name,
            sortingField: "name",
          },
          {
            id: "value",
            header: "Parâmetro",
            cell: (e) => e.alt,
            sortingField: "alt",
          },
          { id: "type", header: "Tipo", cell: (e) => e.type },
          {
            id: "description",
            header: "Descrição",
            cell: (e) => e.description,
          },
        ]}
        items={[
          {
            name: "Item 1",
            alt: "First",
            description: "This is the first item",
            type: "1A",
            size: "Small",
          },
          {
            name: "Item 2",
            alt: "Second",
            description: "This is the second item",
            type: "1B",
            size: "Large",
          },
          {
            name: "Item 3",
            alt: "Third",
            description: "-",
            type: "1A",
            size: "Large",
          },
          {
            name: "Item 4",
            alt: "Fourth",
            description: "This is the fourth item",
            type: "2A",
            size: "Small",
          },
          {
            name: "Item 5",
            alt: "-",
            description: "This is the fifth item with a longer description",
            type: "2A",
            size: "Large",
          },
          {
            name: "Item 6",
            alt: "Sixth",
            description: "This is the sixth item",
            type: "1A",
            size: "Small",
          },
        ]}
        loadingText="Loading resources"
        selectionType="multi"
        trackBy="name"
        visibleColumns={["name", "value", "type", "description"]}
        empty={
          <Box textAlign="center" color="inherit">
            <b>No resources</b>
            <Box padding={{ bottom: "s" }} variant="p" color="inherit">
              No resources to display.
            </Box>
          </Box>
        }
      />
    </Modal>
  );
}
