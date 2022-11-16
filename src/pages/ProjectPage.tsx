import axios from "axios";
import { Project } from "../types";

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
} from "@cloudscape-design/components";
import { DeleteProjectModal } from "../components/DeleteProjectModal";

export function ProjectPage() {
  let { id } = useParams();

  const [project, setProject] = useState<Project>({
    id: "",
    title: "404",
    description: "Este projeto não está cadastrado no sistema.",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
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
                  <Button iconName="edit">Editar</Button>
                  <Button
                    iconName="close"
                    variant="primary"
                    onClick={() => setVisible(true)}
                  >
                    Excluir
                  </Button>
                </SpaceBetween>
              }
            >
              {project.title}
            </Header>
          }
        >
          <Container></Container>
          <DeleteProjectModal
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
