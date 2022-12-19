import axios from "axios";
import { Parameter } from "../../types";

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
import { ParametersTable } from "../../components/Parameter/ParametersTable";
import { Navbar } from "../../components/Navbar";

export function ParametersList() {
  const [parameters, setParameters] = useState<Parameter[]>([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
    axios("http://localhost:3333/parameters").then((response) => {
      setParameters(response.data);
    });
  }

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
            <ParametersTable parameters={parameters} />
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
