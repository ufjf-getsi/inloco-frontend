import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collection } from "../../types";

import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import {
  breadcrumpGroupItems,
  fetchTableData,
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
  const navigate = useNavigate();

  const [collection, setCollection] = useState<Collection>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [planningModalVisible, setPlanningModalVisible] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [tasksAsItems, setTasksAsItems] = useState<Item[]>([]);

  useEffect(() => {
    fetchTableData({
      navigate: navigate,
      setTasksAsItems: setTasksAsItems,
      collectionId: id ?? ``,
    });
  }, []);

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
    serverDeleteLink: `/collections/${id}`,
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
      fetchRecordLink={`/collections/${id}`}
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
