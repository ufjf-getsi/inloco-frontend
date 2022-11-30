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
import { CollectionsTable } from "../../components/Collection/CollectionsTable";
import Tasks from "../../components/Tasks";

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
              <table className="w-11/12 my-10 text-center m-auto">
                <th className="text-xl" scope="col">
                  Tarefas
                </th>
              </table>
              <Tasks />
            </TextContent>
          </Container>
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
