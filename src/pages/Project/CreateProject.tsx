import { useState } from "react";

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
  FormConnection,
} from "../../components/Project/FormProject";
import { Navbar } from "../../components/Navbar";

export function CreateProject() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [alertText, setAlertText] = useState(
    "O projeto foi criado com sucesso!"
  );

  return (
    <AppLayout
      navigation={<Navbar />}
      toolsHide
      contentType="form"
      content={
        <ContentLayout header={<FormHeader />}>
          <Container>
            <FormConnection
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
            { text: "Projetos", href: "/projects" },
            { text: "Criar projeto", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
