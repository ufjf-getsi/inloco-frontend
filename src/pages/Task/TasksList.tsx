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
import axios from "axios";
import { useEffect, useState } from "react";
import { Navbar } from "../../components/Navbar";
import { TasksTable } from "../../components/Task/TasksTable";
import { Task } from "../../types";

export function TasksList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchTableData();
  }, []);

  function fetchTableData() {
    axios("http://localhost:3333/tasks").then((response) => {
      setTasks(response.data);
    });
  }

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
                    content: <TasksTable tasks={tasks} />,
                  },
                  {
                    label: "Atribuídas",
                    id: "assigned",
                    content: <TasksTable tasks={tasks} />,
                  },
                  {
                    label: "Menções",
                    id: "mentioned",
                    content: <TasksTable tasks={tasks} />,
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
