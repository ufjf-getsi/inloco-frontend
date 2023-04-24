import { useState } from "react";
import { useParams } from "react-router-dom";
import { Equipment } from "../../types";

import GenericViewPage from "../../generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../generic/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Equipment/GenericEquipment";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

export default function ViewEquipment() {
  const { id } = useParams();

  const [equipment, setEquipment] = useState<Equipment>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "equipamento",
    recordCategoryPlural: "equipamentos",
    recordName: equipment.name,
    recordGenderFeminine: false,
    serverDeleteLink: `/equipment/${id}`,
    afterDeleteRedirectLink: `/equipment`,
  };

  return (
    <GenericViewPage
      title={equipment.name}
      description={""}
      navbarActiveLink={`/equipment`}
      setRecord={setEquipment}
      fetchRecordLink={`/equipment/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "view" })}
        />
      }
      editRecordLink={`/equipment/${equipment.id}/edit`}
      previousPageLink={`/equipment`}
      deleteModal={deleteModalConfig}
    />
  );
}
