import { useParams } from "react-router-dom";
import { useState } from "react";

import { Task } from "../../types";

import GenericViewPage from "../../generic/pages/GenericViewPage";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";
import {
  breadcrumpGroupItems,
  formatTitle,
  notLoadedRecord,
} from "../../components/Task/GenericTask";
import { GenericDeleteModalProps } from "../../generic/components/GenericDeleteModal";

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

  const displayedInfo = {
    data: new Map([
      [`Status`, task.isPending ? "Tarefa pendente" : "Tarefa concluída"],
    ]),
  };

  return (
    <GenericViewPage
      title={formatTitle(task)}
      displayedInfo={displayedInfo}
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
