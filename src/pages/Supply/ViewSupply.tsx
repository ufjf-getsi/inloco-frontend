import { useState } from "react";
import { useParams } from "react-router-dom";
import { Supply } from "../../types";

import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Supply/GenericSupply";
import GenericBreadcrumbGroup from "../../components/Generic/GerenicBreadcrumbGroup";

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
    serverDeleteLink: `${import.meta.env.VITE_SERVER_URL}/supplies/${id}`,
    afterDeleteRedirectLink: `${import.meta.env.VITE_BASE_URL_HASH}supplies`,
  };

  return (
    <GenericViewPage
      title={supply.name}
      description={""}
      navbarActiveLink={`/supplies`}
      setRecord={setSupply}
      fetchRecordLink={`${import.meta.env.VITE_SERVER_URL}/supplies/${id}`}
      breadcrumbs={
        <GenericBreadcrumbGroup
          items={breadcrumpGroupItems({ pageType: "view" })}
        />
      }
      editRecordLink={`/supplies/${supply.id}/edit`}
      previousPageLink={`/supplies`}
      deleteModal={deleteModalConfig}
    />
  );
}
