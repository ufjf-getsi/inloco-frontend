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
} from "@cloudscape-design/components";

import { ToolsList } from "../../components/ToolsList";

export function ViewCollection() {
  let { id } = useParams();

  const [collection, setCollection] = useState<Collection>({
    id: "",
    projectId: "",
    title: "404",
    points: [],
  });
  const [visible, setVisible] = useState(false);
  const [toolsModalVisible, setToolsModalVisible] = useState(false);

  useEffect(() => {
    fetchCollectionData();
  }, []);

  function fetchCollectionData() {
    axios(`http://localhost:3333/collections/${id}`).then((response) => {
      setCollection(response.data);
    });
  }

  return (
    <AppLayout
      navigationHide
      toolsHide
      contentType="form"
      content={
        <ContentLayout header={<Header variant="h2">Coleta</Header>}>
          <Container>
            <TextContent>
              <h1 className="my-2">Pontos</h1>
              <strong onClick={() => setToolsModalVisible(true)}>
                Ponto 1
              </strong>
              <br />
              <strong onClick={() => setToolsModalVisible(true)}>
                Ponto 2
              </strong>
              <ToolsList
                toolsModalVisible={toolsModalVisible}
                setToolsModalVisible={setToolsModalVisible}
              />
            </TextContent>
          </Container>
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
