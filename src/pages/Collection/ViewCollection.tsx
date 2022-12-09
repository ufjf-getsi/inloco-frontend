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

import { ToolsList } from "../../components/ToolsList";
import { PointsTable } from "../../components/Point/PointsTable";
import { CreatePointForm } from "../../components/Point/FormCreatePoint";
import { DeleteCollectionModal } from "../../components/Collection/DeleteCollectionModal";

export function ViewCollection() {
  let { id } = useParams();

  const [collection, setCollection] = useState<Collection>({
    id: "",
    projectId: "",
    title: "404",
    points: [],
  });
  const [createPointModalVisible, setCreatePointModalVisible] = useState(false);
  const [deleteCollectionModalVisible, setDeleteCollectionModalVisible] =
    useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [alertText, setAlertText] = useState(
    "O ponto foi adicionado com sucesso!"
  );
  const [toolsModalVisible, setToolsModalVisible] = useState(false);

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
      navigationHide
      toolsHide
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
                      setCreatePointModalVisible(true);
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
              {"Coleta"}
            </Header>
          }
        >
          <Container>
            <TextContent>
              <h1 className="my-2">Pontos</h1>
              <PointsTable
                points={collection.points}
                setToolsModalVisible={setToolsModalVisible}
              />
              <ToolsList
                toolsModalVisible={toolsModalVisible}
                setToolsModalVisible={setToolsModalVisible}
              />
            </TextContent>
          </Container>
          <CreatePointForm
            collectionId={collection.id}
            createPointModalVisible={createPointModalVisible}
            setCreatePointModalVisible={setCreatePointModalVisible}
            setAlertVisible={setAlertVisible}
            setAlertType={setAlertType}
            setAlertText={setAlertText}
            fetchCollectionData={fetchCollectionData}
          />
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
