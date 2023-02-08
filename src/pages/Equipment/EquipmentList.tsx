import axios from "axios";
import { Equipment } from "../../types";

import { useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  BreadcrumbGroup,
  Header,
  SpaceBetween,
  Button,
} from "@cloudscape-design/components";
import { EquipmentTable } from "../../components/Equipment/EquipmentTable";
import { Navbar } from "../../components/Navbar";

export function EquipmentList() {
  const [equipmentArray, setEquipmentArray] = useState<Equipment[]>([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
    axios("http://localhost:3333/equipment").then((response) => {
      setEquipmentArray(response.data);
    });
  }

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
            <EquipmentTable equipmentArray={equipmentArray} />
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
