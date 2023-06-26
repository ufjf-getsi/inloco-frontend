import { useHref, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Collection } from "../../types";

import GenericViewPage from "../../generic/GenericPages/GenericViewPage";
import {
  breadcrumpGroupItems,
  fetchAllRequiredEquipment,
  fetchTableData,
  notLoadedRecord,
} from "../../components/Collection/GenericCollection";
import { GenericDeleteModalProps } from "../../generic/GenericDeleteModal";
import GenericTable, {
  GenericTableProps,
} from "../../generic/GenericTable/GenericTable";
import {
  Item,
  columnDefinitions as columnDefinitionsPoints,
  visibleContent as visibleContentPoints,
} from "../../components/Point/TableConfig";
import {
  Item as TaskItem,
  columnDefinitions as columnDefinitionsTasks,
  visibleContent as visibleContentTasks,
} from "../../components/Task/TableConfig";
import RequiredEquipment from "../../components/RequiredEquipment";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";
import Button from "@cloudscape-design/components/button";

export default function ViewCollection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [collection, setCollection] = useState<Collection>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [requiredEquipmentVisible, setRequiredEquipmentVisible] =
    useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);
  const [tasksAsItems, setTasksAsItems] = useState<TaskItem[]>([]);
  const [requiredEquipment, setRequiredEquipment] = useState([]);

  const projectId = collection.project?.id ?? ``;

  useEffect(() => {
    fetchTableData({
      navigate: navigate,
      setTasksAsItems: setTasksAsItems,
      collectionId: id ?? ``,
    });
    fetchAllRequiredEquipment({
      navigate: navigate,
      collectionId: id ?? ``,
      setAllRequiredEquipment: setRequiredEquipment,
    });
  }, []);

  const tableConfigPoints: GenericTableProps = {
    allRecords: collection.visitPointList.map((visitPoint): Item => {
      return {
        id: visitPoint.point.id,
        orderOnRoute: visitPoint.orderOnRoute,
        name: visitPoint.point.name,
        coordinates: visitPoint.point.plannedCoordinates,
      };
    }),
    columnDefinitions: columnDefinitionsPoints,
    recordCategorySingular: `ponto`,
    recordCategoryPlural: `pontos`,
    recordGenderFeminine: false,
    addRecordLink: `/collections/${collection.id}/create-point`,
    visibleContent: visibleContentPoints,
    setSelectedRecords: setSelectedPoints,
    otherHeaderActions: [
      <Button
        iconName="upload-download"
        variant="normal"
        key={`reorderPointsButton`}
        href={useHref(`/collections/${id}/reorder-points`)}
      >
        Reordenar
      </Button>,
    ],
    orderBy: 1,
  };

  const tableConfigTasks: GenericTableProps = {
    allRecords: tasksAsItems,
    columnDefinitions: columnDefinitionsTasks,
    recordCategorySingular: `tarefa`,
    recordCategoryPlural: `tarefas`,
    recordGenderFeminine: true,
    addRecordLink: `/collections/${id}/create-task`,
    visibleContent: visibleContentTasks,
    setSelectedRecords: setSelectedPoints,
    otherHeaderActions: [
      <Button
        iconName="upload-download"
        variant="normal"
        key={`reorderTasksButton`}
        href={useHref(`/collections/${id}/reorder-tasks`)}
      >
        Reordenar
      </Button>,
    ],
    orderBy: 1,
  };

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "coleta",
    recordCategoryPlural: "coletas",
    recordGenderFeminine: true,
    serverDeleteLink: `/collections/${id}`,
    afterDeleteRedirectLink: `/projects/${projectId}`,
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
            projectId: projectId,
          })}
        />
      }
      editRecordLink={`/collections/${collection.id}/edit`}
      previousPageLink={`/projects`}
      table={tableConfigPoints}
      deleteModal={deleteModalConfig}
      otherHeaderActions={[
        <Button
          iconName="key"
          key={`requiredEquipmentButton`}
          onClick={() => setRequiredEquipmentVisible(true)}
        >
          Equipamentos
        </Button>,
      ]}
    >
      <div style={{ marginTop: "15vh" }}>
        <GenericTable {...tableConfigTasks} />
      </div>
      <RequiredEquipment
        key={`requiredEquipmentModal`}
        collectionId={collection.id}
        modalVisible={requiredEquipmentVisible}
        setModalVisible={setRequiredEquipmentVisible}
        equipmentList={requiredEquipment}
      />
    </GenericViewPage>
  );
}
