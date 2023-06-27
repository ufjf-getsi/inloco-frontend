import { useParams } from "react-router-dom";
import { useState } from "react";

import { Point } from "../../types";

import GenericViewPage from "../../generic/pages/GenericViewPage";
import { GenericDeleteModalProps } from "../../generic/components/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Point/GenericPoint";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";

export default function ViewPoint() {
  const { id } = useParams();

  const [point, setPoint] = useState<Point>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const projectId = point.project?.id ?? ``;

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "ponto",
    recordCategoryPlural: "pontos",
    recordGenderFeminine: false,
    serverDeleteLink: `/points/${id}`,
    afterDeleteRedirectLink: `/projects/${projectId}`,
  };

  const displayedInfo = {
    data: new Map([[`Coordenadas planejadas`, point.plannedCoordinates]]),
  };

  return (
    <GenericViewPage
      title={point.name}
      description={``}
      navbarActiveLink={`/projects`}
      displayedInfo={displayedInfo}
      setRecord={setPoint}
      fetchRecordLink={`/points/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({
            projectId: projectId,
            pageType: "view",
          })}
        />
      }
      editRecordLink={`/points/${point.id}/edit`}
      previousPageLink={`/project/${projectId}`}
      deleteModal={deleteModalConfig}
    />
  );
}
