import { useState } from "react";
import { useParams } from "react-router-dom";
import { Equipment } from "../../types";

import { BreadcrumbGroup } from "@cloudscape-design/components";
import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";

export function ViewEquipment() {
  let { id } = useParams();

  const [equipment, setEquipment] = useState<Equipment>({
    id: "",
    name: "Carregando...",
  });

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const modalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "equipamento",
    recordCategoryPlural: "equipamentos",
    recordName: equipment.name,
    recordGenderFeminine: false,
    serverDeleteLink: `http://localhost:3333/equipment/${id}`,
    afterDeleteRedirectLink: "/equipment",
  };

  return (
    <GenericViewPage
      title={equipment.name}
      description={""}
      navbarActiveLink={`/equipment`}
      setRecord={setEquipment}
      fetchRecordLink={`http://localhost:3333/equipment/${id}`}
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Equipamentos", href: "/equipment" },
            { text: "Visualizar equipamento", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
      editRecordLink={`/equipment/${equipment.id}/edit`}
      previousPageLink={`/equipment`}
      deleteModalVisible={deleteModalVisible}
      setDeleteModalVisible={setDeleteModalVisible}
      modal={modalConfig}
    />
  );
}
