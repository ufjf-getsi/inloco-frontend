import { useParams } from "react-router-dom";
import { useState } from "react";

import { VisitPoint } from "../../types";

import GenericViewPage from "../../generic/pages/GenericViewPage";
import { GenericDeleteModalProps } from "../../generic/components/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/VisitPoint/GenericVisitPoint";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";
import GenericTable, { GenericTableProps } from "../../generic/components/table/GenericTable";
import {
  Item as ItemMeasurements,
  columnDefinitions as columnDefinitionsMeasurements,
  visibleContent as visibleContentMeasurements,
} from "../../components/Measurement/TableConfig";
import {
  Item as ItemSupply_VisitPointList,
  columnDefinitions as columnDefinitionsSupply_VisitPointList,
  visibleContent as visibleContentSupply_VisitPointList,
} from "../../components/Supply_VisitPoint/TableConfig";

export default function ViewVisitPoint() {
  const { id } = useParams();

  const [visitPoint, setVisitPoint] = useState<VisitPoint>(notLoadedRecord);
  const [selectedMeasurements, setSelectedMeasurements] = useState([]);
  const [selectedSupply_VisitPointList, setSelectedSupply_VisitPointList] =
    useState([]);
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

  const tableConfigSupply_VisitPointList: GenericTableProps = {
    allRecords: visitPoint.supply_VisitPointList.map(
      (supply_VisitPointList): ItemSupply_VisitPointList => {
        return {
          id: supply_VisitPointList.id,
          name: supply_VisitPointList.supply.name,
          quantity: supply_VisitPointList.quantity,
          stock: supply_VisitPointList.supply.stock,
        };
      }
    ),
    columnDefinitions: columnDefinitionsSupply_VisitPointList,
    recordCategorySingular: `suprimento`,
    recordCategoryPlural: `suprimentos`,
    recordGenderFeminine: false,
    visibleContent: visibleContentSupply_VisitPointList,
    setSelectedRecords: setSelectedSupply_VisitPointList,
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

  const displayedInfo = {
    data: new Map([
      [`Coordenadas planejadas`, visitPoint.point.plannedCoordinates],
      [`Coordenadas aferidas`, visitPoint.actualCoordinates],
    ]),
    gridDefinition: [{ colspan: { default: 12, xxs: 6 } }],
  };

  return (
    <GenericViewPage
      title={visitPoint.point.name}
      displayedInfo={displayedInfo}
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
      <GenericTable {...tableConfigSupply_VisitPointList} />
    </GenericViewPage>
  );
}
