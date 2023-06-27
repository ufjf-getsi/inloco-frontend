import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { TaskType } from "../../types";
import { handleFormSubmit } from "../../functions/controller";

import { breadcrumpGroupItems } from "../../components/Task/GenericTask";
import { notLoadedRecord as notLoadedParent } from "../../components/Collection/GenericCollection";
import GenericReorderPage, {
  GenericReorderPageProps,
} from "../../generic/pages/GenericReorderPage";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";
import { AlertProps } from "@cloudscape-design/components";
import { BoardProps } from "@cloudscape-design/board-components";

export default function ReorderTasks() {
  const navigate = useNavigate();

  const [collection, setCollection] = useState(notLoadedParent);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [items, setItems] = useState<
    BoardProps.Item<{ title: string; content: string }>[]
  >([]);

  const { collectionId } = useParams();
  const previousPageWebLink = `/collections/${collectionId}`;
  const fetchRecordServerLink = `/collections/${collectionId}`;
  const pushRecordServerLink = `/collections/${collectionId}/reorder-tasks`;
  const commonCollectionId = collection.id ?? ``;
  const commonProjectId = collection.project?.id ?? ``;

  function handleFetchResponse() {
    const startingItems: {
      id: string;
      columnSpan: number;
      rowSpan: number;
      data: { title: string; content: string };
    }[] = [];
    collection.tasks.forEach((task) => {
      if (task.type === TaskType.commonTask)
        startingItems.push({
          id: task.id,
          columnSpan: 12,
          rowSpan: 1,
          data: {
            title: task.title,
            content: task.isPending ? `Pendente` : `Concluída`,
          },
        });
    });
    setItems(startingItems);
  }
  useEffect(() => {
    handleFetchResponse();
  }, [collection]);

  async function handleSubmit(event: FormEvent) {
    const sendableData = items.map((item) => {
      return { id: item.id };
    });
    handleFormSubmit({
      event: event,
      edit: true,
      validFields: true,
      relativeServerUrl: pushRecordServerLink,
      sendableData: sendableData,
      setAlertType: setAlertType,
      setAlertVisible: setAlertVisible,
      navigate: navigate,
      successRedirectLink: previousPageWebLink,
    });
  }

  const commonAttributes: GenericReorderPageProps = {
    description: ``,
    navbarActiveLink: `/projects`,
    breadcrumbs: (
      <GenericBreadcrumbGroup
        items={breadcrumpGroupItems({
          projectId: commonProjectId,
          collectionId: commonCollectionId,
          pageType: "reorder",
        })}
      />
    ),
    recordGenderFeminine: true,
    recordCategorySingular: `tarefa`,
    recordCategoryPlural: `tarefas`,
    handleSubmit: handleSubmit,
    alertType: alertType,
    alertVisible: alertVisible,
    setAlertVisible: setAlertVisible,
    cancelRedirectLink: previousPageWebLink,
    fetchParentLink: fetchRecordServerLink,
    setParent: setCollection,
    items: items,
    setItems: setItems,
  };

  return <GenericReorderPage {...commonAttributes}></GenericReorderPage>;
}
