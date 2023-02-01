import axios from "axios";
import { Task } from "../../types";

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  AppLayout,
  ContentLayout,
  Container,
  BreadcrumbGroup,
  Alert,
  AlertProps,
} from "@cloudscape-design/components";

import { Navbar } from "../../components/Navbar";
import { FormConnection, FormHeader } from "../../components/Task/FormTask";

export function EditTask() {
  let { id } = useParams();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [alertText, setAlertText] = useState(
    "A tarefa foi editado com sucesso!"
  );
  const [task, setTask] = useState<Task>({
    id: "",
    title: "404",
    status: "null",
    url: "null",
  });

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
        <ContentLayout header={<FormHeader edit={true} />}>
          <Container>
            <FormConnection
              edit={true}
              setAlertVisible={setAlertVisible}
              setAlertType={setAlertType}
              setAlertText={setAlertText}
            />
          </Container>
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
            { text: "Tarefas", href: "/tasks" },
            { text: "Tarefa", href: "./" },
            { text: "Editar tarefa", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
