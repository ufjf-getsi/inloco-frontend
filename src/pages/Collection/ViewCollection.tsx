import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Collection } from "../../types";

import {
  AppLayout,
  ContentLayout,
  Header,
  Container,
  BreadcrumbGroup,
  SpaceBetween,
  Button,
  Alert,
  AlertProps,
} from "@cloudscape-design/components";
import { FormConnection as FormPoint } from "../../components/Point/FormPoint";
import { DeleteCollectionModal } from "../../components/Collection/DeleteCollectionModal";
import { Navbar } from "../../components/Navbar";
import { DeletePointModal } from "../../components/Point/DeletePointModal";
import GenericTable from "../../components/Generic/GenericTable/GenericTable";
import {
  columnDefinitions,
  visibleContent,
} from "../../components/Point/TableConfig";
import { PlanningModal } from "../../components/PlanningModal";

export function ViewCollection() {
  let { id } = useParams();

  const [collection, setCollection] = useState<Collection>({
    id: "",
    projectId: "",
    title: "Carregando...",
    points: [],
    tasks: [],
  });
  const [pointModalVisible, setPointModalVisible] = useState(false);
  const [planningModalVisible, setPlanningModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(undefined);
  const [selectedPoints, setSelectedPoints] = useState([]);

  const [deleteCollectionModalVisible, setDeleteCollectionModalVisible] =
    useState(false);
  const [deletePointModalVisible, setDeletePointModalVisible] = useState(false);

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [alertText, setAlertText] = useState(
    "O ponto foi adicionado com sucesso!"
  );

  function updateAlert(success: boolean, edit: boolean) {
    if (success) {
      setAlertType("success");
      setAlertText(
        `O ponto foi ${edit ? "editado" : "adicionado"} com sucesso!`
      );
    } else {
      setAlertType("error");
      setAlertText(
        `Não foi possível ${
          edit ? "editar" : "adicionar"
        } o ponto! Tente novamente.`
      );
    }
  }

  function fetchCollectionData() {
    axios(`http://localhost:3333/collections/${id}`).then((response) => {
      setCollection(response.data);
    });
  }

  useEffect(() => {
    fetchCollectionData();
  }, []);

  // Hide alert after 3 seconds if success
  useEffect(() => {
    if (alertType === "success") {
      setTimeout(() => {
        setAlertVisible(false);
      }, 3000);
    }
  }, [alertVisible]);

  return (
    <AppLayout
      navigation={<Navbar />}
      toolsHide
      contentType="form"
      content={
        <ContentLayout
          header={
            <Header
              variant="h2"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button
                    iconName="add-plus"
                    variant="primary"
                    onClick={() => {
                      setSelectedPoint(undefined);
                      setPointModalVisible(true);
                    }}
                  >
                    Novo Ponto
                  </Button>
                  <Button
                    onClick={() => {
                      setPlanningModalVisible(true);
                    }}
                    iconName="file"
                    variant="primary"
                  >
                    Gerar planejamento
                  </Button>
                  <Button
                    iconName="edit"
                    href={`/collections/${collection.id}/edit`}
                  >
                    Editar
                  </Button>
                  <Button
                    iconName="close"
                    onClick={() => setDeleteCollectionModalVisible(true)}
                  >
                    Excluir
                  </Button>
                </SpaceBetween>
              }
            >
              {collection.title}
            </Header>
          }
        >
          <Container>
            <GenericTable
              allRecords={collection.points}
              columnDefinitions={columnDefinitions(
                setSelectedPoint,
                setPointModalVisible
              )}
              recordNameSingular={`ponto`}
              recordNamePlural={`pontos`}
              addRecordLink={`#createPoint`}
              visibleContent={visibleContent}
              setSelectedRecords={setSelectedPoints}
            />
          </Container>
          <FormPoint
            collectionId={collection.id}
            point={selectedPoint}
            modalVisible={pointModalVisible}
            setModalVisible={setPointModalVisible}
            setAlertVisible={setAlertVisible}
            updateAlert={updateAlert}
            fetchCollectionData={fetchCollectionData}
            setDeleteModalVisible={setDeletePointModalVisible}
          />
          <PlanningModal
            collectionId={collection.id}
            points={collection.points}
            modalVisible={planningModalVisible}
            setModalVisible={setPlanningModalVisible}
          />
          {selectedPoint && (
            <DeletePointModal
              point={selectedPoint}
              visible={deletePointModalVisible}
              setVisible={setDeletePointModalVisible}
              fetchCollectionData={fetchCollectionData}
            />
          )}
          <DeleteCollectionModal
            collectionId={collection.id}
            collectionTitle={collection.title}
            projectId={collection.projectId}
            visible={deleteCollectionModalVisible}
            setVisible={setDeleteCollectionModalVisible}
          />
          <Alert
            onDismiss={() => setAlertVisible(false)}
            visible={alertVisible}
            dismissAriaLabel="Fechar alerta"
            dismissible
            type={alertType}
            className="absolute right-0 w-fit mt-8 mr-8"
          >
            {alertText}
          </Alert>
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Projetos", href: "/" },
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
    />
  );
}
