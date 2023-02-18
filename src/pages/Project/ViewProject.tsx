import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { DeleteProjectModal } from "../../components/Project/DeleteProjectModal";
import { Navbar } from "../../components/Navbar";
import GenericTable from "../../components/Generic/GenericTable/GenericTable";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Collection/TableConfig";

export function ViewProject() {
  let { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<Project>({
    id: "",
    title: "Carregando...",
    description: "Este projeto não está cadastrado no sistema.",
    collections: [],
    notes: [],
  });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);

  function fetchProjectData() {
    axios(`http://localhost:3333/projects/${id}`).then((response) => {
      if (response.data) setProject(response.data);
      else navigate("/projects");
    });
  }
  useEffect(() => {
    fetchProjectData();
  }, []);

  return (
    <AppLayout
      navigation={<Navbar />}
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
                    href={`/projects/${project.id}/collections`}
                  >
                    Nova Coleta
                  </Button>
                  <Button iconName="edit" href={`/projects/${project.id}/edit`}>
                    Editar
                  </Button>
                  <Button
                    iconName="close"
                    onClick={() => setDeleteModalVisible(true)}
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
          <Container>
            <GenericTable
              allRecords={project.collections}
              columnDefinitions={columnDefinitions}
              recordNameSingular={`coleta`}
              recordNamePlural={`coletas`}
              addRecordLink={`/projects/${project.id}/collections`}
              visibleContent={visibleContent}
              setSelectedRegistries={setSelectedCollections}
            />
          </Container>
          <DeleteProjectModal
            projectId={project.id}
            visible={deleteModalVisible}
            setVisible={setDeleteModalVisible}
            projectTitle={project.title}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Projetos", href: "/projects" },
            { text: "Visualizar projeto", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
