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
import { TasksTable } from "../../components/Task/TasksTable";

export function TasksList() {
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
                    id: "created",
                    content: "Tarefas criadas",
                  },
                  {
                    label: "Atribuídas",
                    id: "assigned",
                    content: "Tarefas atribuídas",
                  },
                  {
                    label: "Menções",
                    id: "mentioned",
                    content: "Tarefas em que você é mencionado(a)",
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
