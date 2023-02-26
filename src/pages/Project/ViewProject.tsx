import { useState } from "react";
import { useParams } from "react-router-dom";
import { Project } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import { GenericTableProps } from "../../components/Generic/GenericTable/GenericTable";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Collection/TableConfig";
import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";

export function ViewProject() {
  let { id } = useParams();

  const [project, setProject] = useState<Project>({
    id: "",
    title: "Carregando...",
    description: "Este projeto não está cadastrado no sistema.",
    collections: [],
    notes: [],
  });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);

  const tableConfig: GenericTableProps = {
    allRecords: project.collections,
    columnDefinitions: columnDefinitions,
    recordCategorySingular: `coleta`,
    recordCategoryPlural: `coletas`,
    recordGenderFeminine: true,
    addRecordLink: `/projects/${project.id}/collections`,
    visibleContent: visibleContent,
    setSelectedRecords: setSelectedCollections,
  };

  const modalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "projeto",
    recordCategoryPlural: "projetos",
    recordGenderFeminine: false,
    serverDeleteLink: `http://localhost:3333/projects/${id}`,
    afterDeleteRedirectLink: "/projects",
  };

  return (
    <GenericViewPage
      title={project.title}
      description={project.description}
      navbarActiveLink={`/projects`}
      setRecord={setProject}
      fetchRecordLink={`http://localhost:3333/projects/${id}`}
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
      editRecordLink={`/projects/${project.id}/edit`}
      deleteModalVisible={deleteModalVisible}
      setDeleteModalVisible={setDeleteModalVisible}
      table={tableConfig}
      modal={modalConfig}
    />
  );
}
