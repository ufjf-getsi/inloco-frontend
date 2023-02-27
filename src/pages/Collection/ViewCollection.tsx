import { useParams } from "react-router-dom";
import { useState } from "react";
import { Collection } from "../../types";

import { BreadcrumbGroup, Button } from "@cloudscape-design/components";
import GenericViewPage from "../../components/Generic/GenericPages/GenericViewPage";
import { notLoadedRecord } from "../../components/Collection/GenericCollection";
import { GenericDeleteModalProps } from "../../components/Generic/GenericDeleteModal";
import { GenericTableProps } from "../../components/Generic/GenericTable/GenericTable";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Point/TableConfig";
import { PlanningModal } from "../../components/PlanningModal";

export function ViewCollection() {
  let { id } = useParams();

  const [collection, setCollection] = useState<Collection>(notLoadedRecord);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [planningModalVisible, setPlanningModalVisible] = useState(false);
  const [selectedPoints, setSelectedPoints] = useState([]);

  const tableConfig: GenericTableProps = {
    allRecords: collection.points,
    columnDefinitions: columnDefinitions,
    recordCategorySingular: `ponto`,
    recordCategoryPlural: `pontos`,
    recordGenderFeminine: false,
    addRecordLink: `/collections/${collection.id}/createPoint`,
    visibleContent: visibleContent,
    setSelectedRecords: setSelectedPoints,
  };

  const deleteModalConfig: GenericDeleteModalProps = {
    visible: deleteModalVisible,
    setVisible: setDeleteModalVisible,
    recordCategorySingular: "coleta",
    recordCategoryPlural: "coletas",
    recordGenderFeminine: true,
    serverDeleteLink: `http://localhost:3333/collections/${id}`,
    afterDeleteRedirectLink: `/projects/${collection.projectId}`,
    alertText: `Proceder com esta ação deletará a coleta com todo o seu conteúdo,
    incluindo todos os pontos e registros associados a ela.`,
  };

  return (
    <GenericViewPage
      title={collection.title}
      description={""}
      navbarActiveLink={`/projects`}
      setRecord={setCollection}
      fetchRecordLink={`http://localhost:3333/collections/${id}`}
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Projetos", href: "/projects" },
            {
              text: "Projeto",
              href: `/${
                collection.projectId !== ""
                  ? "projects/" + collection.projectId
                  : ""
              }`,
            },
            { text: "Coleta", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
      editRecordLink={`/collections/${collection.id}/edit`}
      previousPageLink={`/collections`}
      table={tableConfig}
      deleteModal={deleteModalConfig}
      otherHeaderActions={[
        <Button
          onClick={() => {
            setPlanningModalVisible(true);
          }}
          iconName="file"
          variant="primary"
        >
          Gerar planejamento
        </Button>,
      ]}
    >
      <PlanningModal
        collectionId={collection.id}
        points={collection.points}
        modalVisible={planningModalVisible}
        setModalVisible={setPlanningModalVisible}
      />
    </GenericViewPage>
  );
}
