import { useParams } from "react-router-dom";
import { useState } from "react";
import { Task } from "../../types";

import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Task/GenericTask";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";

interface TaskWithProjectId extends Task {
  projectId: string;
}

export default function ViewTask() {
  const { id } = useParams();

  const [task, setTask] = useState<TaskWithProjectId>({
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
    serverDeleteLink: `http://localhost:3333/tasks/${id}`,
    afterDeleteRedirectLink: `/collections/${task.collectionId}`,
  };

  return (
    <GenericViewPage
      title={task.title}
      description={task.url}
      navbarActiveLink={`/projects`}
      setRecord={setTask}
      fetchRecordLink={`http://localhost:3333/tasks/${id}`}
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
      previousPageLink={`/collections/${task.collectionId}`}
      deleteModal={deleteModalConfig}
    />
  );
}
