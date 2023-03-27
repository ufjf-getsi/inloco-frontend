import { useState } from "react";
import { useParams } from "react-router-dom";
import { Equipment } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Equipment/GenericEquipment";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";

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
    serverDeleteLink: `${import.meta.env.VITE_SERVER_URL}/equipment/${id}`,
    afterDeleteRedirectLink: `${import.meta.env.BASE_URL}equipment`,
  };

  return (
    <GenericViewPage
      title={equipment.name}
      description={""}
      navbarActiveLink={`/equipment`}
      setRecord={setEquipment}
      fetchRecordLink={`${import.meta.env.VITE_SERVER_URL}/equipment/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "view" })}
        />
      }
      editRecordLink={`/equipment/${equipment.id}/edit`}
      previousPageLink={`${import.meta.env.BASE_URL}equipment`}
      deleteModal={deleteModalConfig}
    />
  );
}
