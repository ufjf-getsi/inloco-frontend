import { useParams } from "react-router-dom";
import { useState } from "react";
import { Point } from "../../types";

import GenericViewPage from "../../generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../generic/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Point/GenericPoint";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

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

  return (
    <GenericViewPage
      title={point.name}
      description={""}
      navbarActiveLink={`/projects`}
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
    >
      {/* // TODO: Show coordinates */}
    </GenericViewPage>
  );
}
