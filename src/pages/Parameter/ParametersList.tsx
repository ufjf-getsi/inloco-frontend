import axios from "axios";
import { useEffect, useState } from "react";
import { Parameter } from "../../types";

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
} from "../../components/Parameter/TableConfig";

export function ParametersList() {
  const [parameters, setParameters] = useState<Parameter[]>([]);
  const [selectedParameters, setSelectedParameters] = useState([]);

  function fetchTableData() {
    axios("http://localhost:3333/parameters").then((response) => {
      setParameters(response.data);
    });
  }
  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <AppLayout
      navigation={<Navbar activeLink="/parameters" />}
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
                    href="parameters/create"
                  >
                    Novo parâmetro
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
              allItems={parameters}
              columnDefinitions={columnDefinitions}
              registryNameSingular={`parâmetro`}
              registryNamePlural={`parâmetros`}
              addRegistryLink={`/create`}
              visibleContent={visibleContent}
              setSelectedRegistries={setSelectedParameters}
            />
          </Container>
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Parâmetros", href: "#" }]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
