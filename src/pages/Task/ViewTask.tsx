import { useParams } from "react-router-dom";
import { useState } from "react";
import { Task } from "../../types";

import GenericViewPage from "../../generic/GenericPages/GenericViewPage";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";
import {
  breadcrumpGroupItems,
  formatTitle,
  notLoadedRecord,
} from "../../components/Task/GenericTask";
import { GenericDeleteModalProps } from "../../generic/GenericDeleteModal";

export default function ViewTask() {
  const { id } = useParams();

  const [task, setTask] = useState<Task>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const collectionId = task.collection?.id ?? "";
  const projectId = task.collection?.project?.id ?? ``;

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "tarefa",
    recordCategoryPlural: "tarefas",
    recordGenderFeminine: true,
    serverDeleteLink: `/tasks/${id}`,
    afterDeleteRedirectLink: `/collections/${collectionId}`,
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
            projectId: projectId,
            collectionId: collectionId,
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
