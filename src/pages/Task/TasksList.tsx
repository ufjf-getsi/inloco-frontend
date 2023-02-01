import {
  AppLayout,
  ContentLayout,
  Container,
  BreadcrumbGroup,
  Header,
  SpaceBetween,
  Button,
  TextFilter,
  TextContent,
  Tabs,
} from "@cloudscape-design/components";
import { useState } from "react";
import { Navbar } from "../../components/Navbar";

export function TaskPage() {
  const [filteringText, setFilteringText] = useState("");

  return (
    <AppLayout
      navigation={<Navbar activeLink="/tasks" />}
      toolsHide
      contentType="form"
      content={
        <ContentLayout
          header={
            <Header
              variant="h1"
              description="InLoco é seu sistema de gerenciamento de informações sobre Limnologia."
              actions={
                <Button
                  iconName="add-plus"
                  variant="primary"
                  href="tasks/create"
                >
                  Nova tarefa
                </Button>
              }
            >
              InLoco
            </Header>
          }
        >
          <Container>
            <TextContent>
              <h1>Tarefas</h1>
            </TextContent>
            <SpaceBetween direction="horizontal" size="xs">
              <Tabs
                tabs={[
                  {
                    label: "Criadas",
                    id: "first",
                    content: "First tab content area",
                  },
                  {
                    label: "Atribuídas",
                    id: "second",
                    content: "Second tab content area",
                  },
                  {
                    label: "Menções",
                    id: "third",
                    content: "Third tab content area",
                  },
                ]}
              />
            </SpaceBetween>
          </Container>
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[{ text: "Tarefas", href: "#" }]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
