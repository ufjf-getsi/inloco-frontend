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
import { notLoadedRecord } from "../../components/Project/GenericProject";

export function ViewProject() {
  let { id } = useParams();

  const [project, setProject] = useState<Project>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCollections, setSelectedCollections] = useState([]);

  const tableConfig: GenericTableProps = {
    allRecords: project.collections,
    columnDefinitions: columnDefinitions,
    recordCategorySingular: `coleta`,
    recordCategoryPlural: `coletas`,
    recordGenderFeminine: true,
    addRecordLink: `/projects/${project.id}/createCollection`,
    visibleContent: visibleContent,
    setSelectedRecords: setSelectedCollections,
  };

  const deleteModalConfig: GenericDeleteModalProps = {
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
            { text: "Projeto", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
      editRecordLink={`/projects/${project.id}/edit`}
      previousPageLink={`/projects`}
      table={tableConfig}
      deleteModal={deleteModalConfig}
    />
  );
}
