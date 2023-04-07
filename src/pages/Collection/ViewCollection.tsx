import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collection, Task, TaskType } from "../../types";

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
  Item,
  columnDefinitions as columnDefinitionsTasks,
  visibleContent as visibleContentTasks,
} from "../../components/Task/TableConfig";
import PlanningModal from "../../components/PlanningModal";
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

  const [tasksAsItems, setTasksAsItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
    axios(`${import.meta.env.VITE_SERVER_URL}/collections/${id}/tasks`).then(
      (response) => {
        const items: Item[] = [];
        response.data.map((task: Task) => {
          if (task.type === TaskType.commonTask) {
            items.push({
              id: task.id,
              status: task.isPending ? "Pendente" : "Concluída",
              title: task.title,
            });
          }
        });
        setTasksAsItems(items);
      }
    );
  }

  const tableConfigTasks: GenericTableProps = {
    allRecords: tasksAsItems,
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
      previousPageLink={`/projects`}
      table={tableConfig}
      deleteModal={deleteModalConfig}
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
