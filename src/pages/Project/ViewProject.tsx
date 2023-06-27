import { useState } from "react";
import { useParams } from "react-router-dom";

import { Project } from "../../types";

import GenericTable, {
  GenericTableProps,
} from "../../generic/components/table/GenericTable";
import {
  columnDefinitions as columnDefinitionsPoints,
  visibleContent as visibleContentPoints,
} from "../../components/Point/TableConfig";
import {
  columnDefinitions as columnDefinitionsCollections,
  visibleContent as visibleContentCollections,
} from "../../components/Collection/TableConfig";
import GenericViewPage from "../../generic/pages/GenericViewPage";
import { GenericDeleteModalProps } from "../../generic/components/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Project/GenericProject";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";

export default function ViewProject() {
  const { id } = useParams();

  const [project, setProject] = useState<Project>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);

  const tableConfigPoints: GenericTableProps = {
    allRecords: project.points,
    columnDefinitions: columnDefinitionsPoints,
    recordCategorySingular: `ponto`,
    recordCategoryPlural: `pontos`,
    recordGenderFeminine: false,
    addRecordLink: `/projects/${project.id}/create-point`,
    visibleContent: visibleContentPoints,
    setSelectedRecords: setSelectedPoints,
  };

  const tableConfigCollections: GenericTableProps = {
    allRecords: project.collections,
    columnDefinitions: columnDefinitionsCollections,
    recordCategorySingular: `coleta`,
    recordCategoryPlural: `coletas`,
    recordGenderFeminine: true,
    addRecordLink: `/projects/${project.id}/create-collection`,
    visibleContent: visibleContentCollections,
    setSelectedRecords: setSelectedCollections,
  };

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "projeto",
    recordCategoryPlural: "projetos",
    recordGenderFeminine: false,
    serverDeleteLink: `/projects/${id}`,
    afterDeleteRedirectLink: `/projects`,
  };

  return (
    <GenericViewPage
      title={project.title}
      description={project.description}
      navbarActiveLink={`/projects`}
      setRecord={setProject}
      fetchRecordLink={`/projects/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "view" })}
        />
      }
      editRecordLink={`/projects/${project.id}/edit`}
      previousPageLink={`/projects`}
      table={tableConfigCollections}
      deleteModal={deleteModalConfig}
    >
      <GenericTable {...tableConfigPoints} />
    </GenericViewPage>
  );
}
