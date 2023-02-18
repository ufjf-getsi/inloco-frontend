import axios from "axios";
import { useEffect, useState } from "react";
import { Equipment } from "../../types";

import {
  AppLayout,
  ContentLayout,
  Container,
  BreadcrumbGroup,
  Header,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { Navbar } from "../../components/Navbar";
import GenericTable from "../../components/GenericTable/GenericTable";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Equipment/TableConfig";

export function EquipmentList() {
  const [equipmentArray, setEquipmentArray] = useState<Equipment[]>([]);
  const [selectedEquipmentList, setSelectedEquipmentList] = useState([]);

  function fetchTableData() {
    axios("http://localhost:3333/equipment").then((response) => {
      setEquipmentArray(response.data);
    });
  }
  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <AppLayout
      navigation={<Navbar activeLink="/equipment" />}
      toolsHide
      contentType="form"
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="InLoco é seu sistema de gerenciamento de informações sobre Limnologia."
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    iconName="add-plus"
                    variant="primary"
                    href="equipment/create"
                  >
                    Novo equipamento
                  </Button>
                </SpaceBetween>
              }
            >
              InLoco
            </Header>
          }
        >
          <Container>
            <GenericTable
              allItems={equipmentArray}
              columnDefinitions={columnDefinitions}
              registryNameSingular={`equipamento`}
              registryNamePlural={`equipamentos`}
              addRegistryLink={`/create`}
              visibleContent={visibleContent}
              setSelectedRegistries={setSelectedEquipmentList}
            />
          </Container>
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Equipamentos", href: "#" }]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
