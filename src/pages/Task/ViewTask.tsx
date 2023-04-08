import { useParams } from "react-router-dom";
import { useState } from "react";
import { Task, TaskType } from "../../types";

import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";
import {
  breadcrumpGroupItems,
  formatTitle,
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

  return (
    <GenericViewPage
      title={formatTitle(task)}
      description={task.isPending ? "Tarefa pendente" : "Tarefa concluída"}
      navbarActiveLink={`/projects`}
      setRecord={setTask}
      fetchRecordLink={`/tasks/${id}`}
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
