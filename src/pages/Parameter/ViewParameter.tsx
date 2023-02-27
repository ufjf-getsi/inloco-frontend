import { useState } from "react";
import { useParams } from "react-router-dom";
import { Parameter } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";
import {
  formatDataType,
  notLoadedRecord,
} from "../../components/Parameter/GenericParameter";

export function ViewParameter() {
  let { id } = useParams();

  const [parameter, setParameter] = useState<Parameter>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

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
        <BreadcrumbGroup
          items={[
            { text: "Parâmetros", href: "/parameters" },
            { text: "Parâmetro", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
      editRecordLink={`/parameters/${parameter.id}/edit`}
      previousPageLink={`/parameters`}
      deleteModal={deleteModalConfig}
    />
  );
}
