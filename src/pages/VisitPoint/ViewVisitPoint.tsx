import { useParams } from "react-router-dom";
import { useState } from "react";
import { VisitPoint } from "../../types";

import GenericViewPage from "../../generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../generic/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/VisitPoint/GenericVisitPoint";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";
import { GenericTableProps } from "../../generic/GenericTable/GenericTable";
import {
  Item as ItemMeasurements,
  columnDefinitions as columnDefinitionsMeasurements,
  visibleContent as visibleContentMeasurements,
} from "../../components/Measurement/TableConfig";

export default function ViewVisitPoint() {
  const { id } = useParams();

  const [visitPoint, setVisitPoint] = useState<VisitPoint>(notLoadedRecord);
  const [selectedMeasurements, setSelectedMeasurements] = useState([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const projectId = visitPoint.collection?.project?.id ?? ``;
  const collectionId = visitPoint.collection?.id ?? ``;

  const tableConfigMeasurements: GenericTableProps = {
    allRecords: visitPoint.measurements.map((measurement): ItemMeasurements => {
      return {
        id: measurement.id,
        parameter: measurement.parameter,
        isPending: measurement.isPending,
        result: measurement.result,
      };
    }),
    columnDefinitions: columnDefinitionsMeasurements,
    recordCategorySingular: `medição`,
    recordCategoryPlural: `medições`,
    recordGenderFeminine: true,
    visibleContent: visibleContentMeasurements,
    setSelectedRecords: setSelectedMeasurements,
  };

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "visita",
    recordCategoryPlural: "visitas",
    recordGenderFeminine: true,
    serverDeleteLink: `/visit-point/${id}`,
    afterDeleteRedirectLink: `/collections/${collectionId}`,
  };

  return (
    <GenericViewPage
      title={visitPoint.point.name}
      description={`Coordenadas aferidas : ${visitPoint.actualCoordinates}`}
      navbarActiveLink={`/projects`}
      setRecord={setVisitPoint}
      fetchRecordLink={`/visit-point/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({
            projectId: projectId,
            collectionId: collectionId,
            pageType: "view",
          })}
        />
      }
      editRecordLink={`/visit-point/${visitPoint.id}/edit`}
      previousPageLink={`/collections/${collectionId}`}
      table={tableConfigMeasurements}
      deleteModal={deleteModalConfig}
    >
      {/* // TODO: Show coordinates */}
    </GenericViewPage>
  );
}
