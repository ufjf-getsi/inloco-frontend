import { useParams } from "react-router-dom";
import { useState } from "react";
import { Task, TaskType } from "../../types";

import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Task/GenericTask";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";

export default function ViewTask() {
  const { id } = useParams();

  const [task, setTask] = useState<Task>({
    projectId: "",
    ...notLoadedRecord,
  });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "tarefa",
    recordCategoryPlural: "tarefas",
    recordGenderFeminine: true,
    serverDeleteLink: `${import.meta.env.VITE_SERVER_URL}/tasks/${id}`,
    afterDeleteRedirectLink: `/collections/${task.collectionId}`,
  };

  let pageTitle = "Tarefa";
  if (task.type === TaskType.commonTask) {
    pageTitle = task.title;
  } else if (task.type === TaskType.equipmentTask) {
    pageTitle = `${task.isBringingBack ? "Trazer" : "Levar"} ${
      task.equipment?.name ?? task.equipmentId
    }`;
  }

  return (
    <GenericViewPage
      title={pageTitle}
      description={task.isPending ? "Tarefa pendente" : "Tarefa concluída"}
      navbarActiveLink={`/projects`}
      setRecord={setTask}
      fetchRecordLink={`${import.meta.env.VITE_SERVER_URL}/tasks/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({
            projectId: task.projectId,
            collectionId: task.collectionId,
            pageType: "view",
          })}
        />
      }
      editRecordLink={`/tasks/${task.id}/edit`}
      previousPageLink={`/projects`}
      deleteModal={deleteModalConfig}
    />
  );
}
