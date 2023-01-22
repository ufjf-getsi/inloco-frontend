import axios from "axios";
import { Collection } from "../../types";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Header,
  Container,
  TextContent,
  BreadcrumbGroup,
  SpaceBetween,
  Button,
  Alert,
  AlertProps,
} from "@cloudscape-design/components";

import { PointsTable } from "../../components/Point/PointsTable";
import { FormConnection as FormPoint } from "../../components/Point/FormPoint";
import { DeleteCollectionModal } from "../../components/Collection/DeleteCollectionModal";
import { Navbar } from "../../components/Navbar";
import { DeletePointModal } from "../../components/Point/DeletePointModal";

export function ViewCollection() {
  let { id } = useParams();

  const [collection, setCollection] = useState<Collection>({
    id: "",
    projectId: "",
    title: "404",
    points: [],
  });
  const [pointModalVisible, setPointModalVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState(undefined);
  const [editPoint, setEditPoint] = useState(false);

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

  function fetchCollectionData() {
    axios(`http://localhost:3333/collections/${id}`).then((response) => {
      setCollection(response.data);
    });
  }

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
                      setPointModalVisible(true);
                    }}
                  >
                    Novo Ponto
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
            <TextContent>
              <h1 className="my-2">Pontos</h1>
              <PointsTable
                points={collection.points}
                setModalVisible={setPointModalVisible}
                setSelectedPoint={setSelectedPoint}
                setEditPoint={setEditPoint}
              />
            </TextContent>
          </Container>
          <FormPoint
            collectionId={collection.id}
            point={selectedPoint}
            edit={editPoint}
            setEditPoint={setEditPoint}
            modalVisible={pointModalVisible}
            setModalVisible={setPointModalVisible}
            setAlertVisible={setAlertVisible}
            updateAlert={updateAlert}
            fetchCollectionData={fetchCollectionData}
            setDeleteModalVisible={setDeletePointModalVisible}
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
