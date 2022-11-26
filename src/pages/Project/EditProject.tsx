import axios from "axios";
import { Project } from "../../types";

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
import {
  FormHeader,
  FormContent,
} from "../../components/Project/FormEditProject";

export function EditProject() {
  let { id } = useParams();

  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [alertText, setAlertText] = useState(
    "O projeto foi editado com sucesso!"
  );
  const [project, setProject] = useState<Project>({
    id: "",
    title: "404",
    description: "Este projeto não está cadastrado no sistema.",
    collections: [],
    notes: [],
  });

  useEffect(() => {
    fetchProjectData();
  }, []);

  function fetchProjectData() {
    axios(`http://localhost:3333/projects/${id}`).then((response) => {
      setProject(response.data);
    });
  }

  return (
    <AppLayout
      navigationHide
      toolsHide
      contentType="form"
      content={
        <ContentLayout header={<FormHeader />}>
          <Container>
            <FormContent
              project={project}
              setProject={setProject}
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
            { text: "Projetos", href: "/" },
            { text: "Editar projeto", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
