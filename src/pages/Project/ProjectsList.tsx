import axios from "axios";
import { useEffect, useState } from "react";
import { Project } from "../../types";

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
} from "../../components/Project/TableConfig";

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedItems, setSelectedItems] = useState([]);

  function fetchTableData() {
    axios("http://localhost:3333/projects").then((response) => {
      setProjects(response.data);
    });
  }

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
    <AppLayout
      navigation={<Navbar activeLink="/projects" />}
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
                    href="projects/create"
                  >
                    Novo projeto
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
              allItems={projects}
              columnDefinitions={columnDefinitions}
              registryNameSingular={`projeto`}
              registryNamePlural={`projetos`}
              addRegistryLink={`/create`}
              visibleContent={visibleContent}
              setSelectedRegistries={setSelectedItems}
            />
          </Container>
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Projetos", href: "#" }]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
