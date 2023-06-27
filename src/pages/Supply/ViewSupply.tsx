import { useState } from "react";
import { useParams } from "react-router-dom";

import { Supply } from "../../types";

import GenericViewPage from "../../generic/pages/GenericViewPage";
import { GenericDeleteModalProps } from "../../generic/components/GenericDeleteModal";
import {
  breadcrumpGroupItems,
  notLoadedRecord,
} from "../../components/Supply/GenericSupply";
import GenericBreadcrumbGroup from "../../generic/components/GerenicBreadcrumbGroup";

export default function ViewSupply() {
  const { id } = useParams();

  const [supply, setSupply] = useState<Supply>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "equipamento",
    recordCategoryPlural: "equipamentos",
    recordName: supply.name,
    recordGenderFeminine: false,
    serverDeleteLink: `/supplies/${id}`,
    afterDeleteRedirectLink: `/supplies`,
  };

  return (
    <GenericViewPage
      title={supply.name}
      description={`Estoque: ${supply.stock}`}
      navbarActiveLink={`/supplies`}
      setRecord={setSupply}
      fetchRecordLink={`/supplies/${id}`}
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
