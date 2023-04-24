import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";

import { AlertProps } from "@cloudscape-design/components";
import { breadcrumpGroupItems } from "../../components/Point/GenericPoint";
import { notLoadedRecord as notLoadedParent } from "../../components/Collection/GenericCollection";
import { handleFormSubmit } from "../../generic/GenericFunctions";
import GenericReorderPage, {
  GenericReorderPageProps,
} from "../../generic/GenericPages/GenericReorderPage";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";
import { BoardProps } from "@cloudscape-design/board-components";

export default function ReorderPoints() {
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
  const pushRecordServerLink = `/collections/${collectionId}/reorder-points`;
  const commonCollectionId = collection.id ?? ``;
  const commonProjectId = collection.projectId ?? ``;

  function handleFetchResponse() {
    const startingItems = collection.points.map((point, index) => {
      return {
        id: point.id,
        columnSpan: 12,
        rowSpan: 1,
        data: { title: point.name, content: point.plannedCoordinates },
      };
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
    recordGenderFeminine: false,
    recordCategorySingular: `ponto`,
    recordCategoryPlural: `pontos`,
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
