import axios from "axios";
import { Project } from "../../types";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  BreadcrumbGroup,
  Header,
  SpaceBetween,
  Button,
  TextContent,
} from "@cloudscape-design/components";

import { DeleteProjectModal } from "../../components/Project/DeleteProjectModal";
import { ToolsList } from "../../components/ToolsList";
import { CollectionsTable } from "../../components/Collection/CollectionsTable";

export function ViewProject() {
  let { id } = useParams();

  const [project, setProject] = useState<Project>({
    id: "",
    title: "404",
    description: "Este projeto não está cadastrado no sistema.",
    collections: [],
    notes: [],
  });
  const [visible, setVisible] = useState(false);
  const [toolsModalVisible, setToolsModalVisible] = useState(false);

  useEffect(() => {
    fetchProjectData();
  }, []);

  function fetchProjectData() {
    axios(`http://localhost:3333/projects/${id}`).then((response) => {
      setProject(response.data);
    });
  }

  return (
    <AppLayout
      navigationHide
      toolsHide
      contentType="form"
      content={
        <ContentLayout
          header={
            <Header
              variant="h2"
              description={project.description}
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    iconName="add-plus"
                    variant="primary"
                    href={project.id + "/collections"}
                  >
                    Nova Coleta
                  </Button>
                  <Button iconName="edit" href={project.id + "/edit"}>
                    Editar
                  </Button>
                  <Button iconName="close" onClick={() => setVisible(true)}>
                    Excluir
                  </Button>
                </SpaceBetween>
              }
            >
              {project.title}
            </Header>
          }
        >
          <Container>
            <TextContent>
              <h1>Coletas</h1>
              <CollectionsTable collections={project.collections} />

              <h1 className="my-2">Pontos</h1>
              <strong onClick={() => setToolsModalVisible(true)}>
                Ponto 1
              </strong>
              <br />
              <strong onClick={() => setToolsModalVisible(true)}>
                Ponto 2
              </strong>
              <br />
              <strong onClick={() => setToolsModalVisible(true)}>
                Ponto 3
              </strong>
            </TextContent>
          </Container>
          <ToolsList
            toolsModalVisible={toolsModalVisible}
            setToolsModalVisible={setToolsModalVisible}
          />
          <DeleteProjectModal
            projectId={project.id}
            visible={visible}
            setVisible={setVisible}
            projectTitle={project.title}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Projetos", href: "/" },
            { text: "Visualizar projeto", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
