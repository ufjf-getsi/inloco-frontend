import { useState } from "react";
import { useParams } from "react-router-dom";
import { Equipment, Parameter } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  formatDataType,
  notLoadedRecord,
} from "../../components/Parameter/GenericParameter";
import { GenericTableProps } from "../../components/Generic/GenericTable/GenericTable";
import {
  columnDefinitions,
  Item,
  visibleContent,
} from "../../components/Equipment/TableConfig";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";

export default function ViewParameter() {
  const { id } = useParams();

  const [parameter, setParameter] = useState<Parameter>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedEquipmentList, setSelectedEquipmentList] = useState([]);

  const tableConfig: GenericTableProps = {
    allRecords: parameter.equipmentList.map((equipment: Equipment): Item => {
      return {
        id: equipment.id,
        name: equipment.name,
      };
    }),
    columnDefinitions: columnDefinitions,
    recordCategorySingular: `equipamento`,
    recordCategoryPlural: `equipamentos`,
    recordGenderFeminine: false,
    visibleContent: visibleContent,
    setSelectedRecords: setSelectedEquipmentList,
  };

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "parâmetro",
    recordCategoryPlural: "parâmetros",
    recordName: parameter.name,
    recordGenderFeminine: false,
    serverDeleteLink: `http://localhost:3333/parameters/${id}`,
    afterDeleteRedirectLink: "/parameters",
  };

  return (
    <GenericViewPage
      title={parameter.name + ` (${parameter.unit})`}
      description={`Tipo de dado: ${formatDataType(parameter.dataType)}`}
      navbarActiveLink={`/parameters`}
      setRecord={setParameter}
      fetchRecordLink={`http://localhost:3333/parameters/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "view" })}
        />
      }
      editRecordLink={`/parameters/${parameter.id}/edit`}
      previousPageLink={`/parameters`}
      table={tableConfig}
      deleteModal={deleteModalConfig}
    />
  );
}
