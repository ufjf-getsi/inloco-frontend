import { useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Header,
  Container,
  TextContent,
  BreadcrumbGroup,
} from "@cloudscape-design/components";

import { ToolsList } from "../../components/ToolsList";
import { Collection } from "../../types";

export function ViewCollection() {
  const [toolsModalVisible, setToolsModalVisible] = useState(false);

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
            { text: "Visualizar projeto", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
