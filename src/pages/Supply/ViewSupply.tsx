import { useState } from "react";
import { useParams } from "react-router-dom";
import { Supply } from "../../types";

import GenericViewPage from "../../generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../generic/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Supply/GenericSupply";
import GenericBreadcrumbGroup from "../../generic/GerenicBreadcrumbGroup";

export default function ViewSupply() {
  const { id } = useParams();

  const [supply, setSupply] = useState<Supply>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "suprimento",
    recordCategoryPlural: "suprimentos",
    recordName: supply.name,
    recordGenderFeminine: false,
    serverDeleteLink: `/supplies/${id}`,
    afterDeleteRedirectLink: `/equipment`,
  };

  return (
    <GenericViewPage
      title={supply.name}
      description={""}
      navbarActiveLink={`/supplies`}
      setRecord={setSupply}
      fetchRecordLink={`/supplies/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "view" })}
        />
      }
      editRecordLink={`/supplies/${supply.id}/edit`}
      previousPageLink={`/equipment`}
      deleteModal={deleteModalConfig}
    />
  );
}
