import { useParams } from "react-router-dom";
import { useState } from "react";
import { Point } from "../../types";

import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Point/GenericPoint";
import { GenericTableProps } from "../../components/Generic/GenericTable/GenericTable";
import {
  columnDefinitions,
  Item,
  visibleContent,
} from "../../components/Measurement/TableConfig";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";

interface PointWithProjectId extends Point {
  projectId: string;
}

export default function ViewPoint() {
  const { id } = useParams();

  const [point, setPoint] = useState<PointWithProjectId>({
    projectId: "",
    ...notLoadedRecord,
  });
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedMeasurements, setSelectedMeasurements] = useState([]);

  const tableConfig: GenericTableProps = {
    allRecords: point.measurements.map((measurement): Item => {
      return {
        id: measurement.id,
        parameterName: measurement.parameter.name,
        isPending: measurement.isPending,
        result: measurement.result,
        unit: measurement.parameter.unit,
      };
    }),
    columnDefinitions: columnDefinitions,
    recordCategorySingular: `medição`,
    recordCategoryPlural: `medições`,
    recordGenderFeminine: true,
    visibleContent: visibleContent,
    setSelectedRecords: setSelectedMeasurements,
  };

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "ponto",
    recordCategoryPlural: "pontos",
    recordGenderFeminine: false,
    serverDeleteLink: `http://localhost:3333/points/${id}`,
    afterDeleteRedirectLink: `/collections/${point.collectionId}`,
  };

  return (
    <GenericViewPage
      title={point.name}
      description={point.plannedCoordinates ?? ""}
      navbarActiveLink={`/projects`}
      setRecord={setPoint}
      fetchRecordLink={`http://localhost:3333/points/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({
            projectId: point.projectId,
            collectionId: point.collectionId,
            pageType: "view",
          })}
        />
      }
      editRecordLink={`/points/${point.id}/edit`}
      previousPageLink={`/collections/${point.collectionId}`}
      table={tableConfig}
      deleteModal={deleteModalConfig}
    />
  );
}
