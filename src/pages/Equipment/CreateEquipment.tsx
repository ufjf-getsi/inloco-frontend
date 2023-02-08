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
} from "../../components/Equipment/FormEquipment";
import { Navbar } from "../../components/Navbar";

export function CreateEquipment() {
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertType, setAlertType] = useState<AlertProps.Type>("success");
  const [alertText, setAlertText] = useState(
    "O equipamento foi criado com sucesso!"
  );

  function updateAlert(success: boolean) {
    if (success) {
      setAlertType("success");
      setAlertText(`O equipamento foi adicionado com sucesso!`);
    } else {
      setAlertType("error");
      setAlertText(
        `Não foi possível adicionar o equipamento! Tente novamente.`
      );
    }
  }

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
              updateAlert={updateAlert}
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
            { text: "Equipamentos", href: "/equipment" },
            { text: "Registrar equipamentos", href: "#" },
          ]}
          expandAriaLabel="Mostrar caminho"
          ariaLabel="Breadcrumbs"
        />
      }
    />
  );
}
