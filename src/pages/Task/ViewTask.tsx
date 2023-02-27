import axios from "axios";
import { Collection, Task } from "../../types";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  BreadcrumbGroup,
  Header,
  SpaceBetween,
  Button,
  TextContent,
} from "@cloudscape-design/components";
import Navbar from "../../components/Navbar";
import { DeleteTaskModal } from "../../components/Task/DeleteTaskModal";

export function ViewTask() {
  let { id } = useParams();

  const [task, setTask] = useState<Task>({
    id: "",
    title: "404",
    status: "null",
    url: "null",
    collectionId: "",
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    fetchTaskData();
  }, []);

  function fetchTaskData() {
    axios(`http://localhost:3333/tasks/${id}`).then((response) => {
      setTask(response.data);
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
              description={task.status}
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  <Button iconName="edit" href={`/tasks/${task.id}/edit`}>
                    Editar
                  </Button>
                  <Button iconName="close" onClick={() => setVisible(true)}>
                    Excluir
                  </Button>
                </SpaceBetween>
              }
            >
              {task.title}
            </Header>
          }
        >
          <Container>
            <TextContent>
              <h2>Tarefa referente a coleta {task.collectionId}</h2>
            </TextContent>
          </Container>
          <DeleteTaskModal
            taskId={task.id}
            visible={visible}
            setVisible={setVisible}
            taskTitle={task.title}
          />
        </ContentLayout>
      }
      headerSelector="#header"
      breadcrumbs={
        <BreadcrumbGroup
          items={[
            { text: "Tarefas", href: "/tasks" },
            { text: "Visualizar tarefa", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
