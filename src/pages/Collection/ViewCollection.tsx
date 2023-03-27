import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collection, Task } from "../../types";

import {
  BreadcrumbGroup,
  Button,
  Container,
} from "@cloudscape-design/components";
import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Collection/GenericCollection";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";
import GenericTable, {
  GenericTableProps,
} from "../../components/Generic/GenericTable/GenericTable";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Point/TableConfig";
import {
  columnDefinitions as columnDefinitionsTasks,
  visibleContent as visibleContentTasks,
} from "../../components/Task/TableConfig";
import PlanningModal from "../../components/PlanningModal";
import axios from "axios";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";

export default function ViewCollection() {
  const { id } = useParams();

  const [collection, setCollection] = useState<Collection>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [planningModalVisible, setPlanningModalVisible] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);

  const tableConfig: GenericTableProps = {
    allRecords: collection.points,
    columnDefinitions: columnDefinitions,
    recordCategorySingular: `ponto`,
    recordCategoryPlural: `pontos`,
    recordGenderFeminine: false,
    addRecordLink: `/collections/${collection.id}/createPoint`,
    visibleContent: visibleContent,
    setSelectedRecords: setSelectedPoints,
  };

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
    axios(`${import.meta.env.VITE_SERVER_URL}/collections/${id}/tasks`).then(
      (response) => {
        setTasks(response.data);
      }
    );
  }

  const tableConfigTasks: GenericTableProps = {
    allRecords: tasks,
    columnDefinitions: columnDefinitionsTasks,
    recordCategorySingular: `tarefa`,
    recordCategoryPlural: `tarefas`,
    recordGenderFeminine: true,
    addRecordLink: `/collections/${id}/createTask`,
    visibleContent: visibleContentTasks,
    setSelectedRecords: setSelectedPoints,
  };

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "coleta",
    recordCategoryPlural: "coletas",
    recordGenderFeminine: true,
    serverDeleteLink: `${import.meta.env.VITE_SERVER_URL}/collections/${id}`,
    afterDeleteRedirectLink: `/projects/${collection.projectId}`,
    alertText: `Proceder com esta ação deletará a coleta com todo o seu conteúdo,
    incluindo todos os pontos e registros associados a si.`,
  };

  return (
    <GenericViewPage
      title={collection.title}
      description={""}
      navbarActiveLink={`/projects`}
      setRecord={setCollection}
      fetchRecordLink={`${import.meta.env.VITE_SERVER_URL}/collections/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({
            pageType: "view",
            projectId: collection.projectId,
          })}
        />
      }
      editRecordLink={`/collections/${collection.id}/edit`}
      previousPageLink={`${import.meta.env.VITE_BASE_URL_HASH}projects`}
      table={tableConfig}
      deleteModal={deleteModalConfig}
      otherHeaderActions={[
        <Button
          key={`generatePlanningButton`}
          onClick={() => {
            setPlanningModalVisible(true);
          }}
          iconName="file"
          variant="primary"
        >
          Gerar planejamento
        </Button>,
      ]}
    >
      <div style={{ marginTop: "15vh" }}>
        <GenericTable {...tableConfigTasks} />
      </div>
      <PlanningModal
        key={`planningModal`}
        collectionId={collection.id}
        points={collection.points}
        modalVisible={planningModalVisible}
        setModalVisible={setPlanningModalVisible}
      />
    </GenericViewPage>
  );
}
